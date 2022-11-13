import Users from "../models/users.js";
import mongoose from "mongoose";
class UsersController {
	constructor() {
		this.findOne = this.findOne.bind(this);
		this.getDates = this.getDates.bind(this);
	}

	findOne = (req, res) => {
		const id = new mongoose.Types.ObjectId(req.params.id);
		Users.findById(id, function (err, workout) {
			if (err) res.send(err);
			res.setHeader("Content-Type", "application/json");
			res.json(workout);
		});
	}

	getDates = (ndate) => {
		const date = new Date(ndate);
		date.setUTCHours(0, 0, 0, 0);
		console.log({ date });
		const startDate = date.toISOString();
		const endDate = new Date(date.setDate(date.getDate() + 1)).toISOString();
		return {startDate: startDate, endDate:endDate};
	}

	insertWeight = (req, res) => {
		const self = this
		const dateString = req.body.date;

		const inputReq = {
			id : new mongoose.Types.ObjectId(req.body.userId),
			date: this.getDates(req.body.date),
			weight: req.body.weight
		};	
		 
		try {
		 
			Users.findOneAndUpdate(
				{
					_id: inputReq.id,
					"data.date": {
						$gt: new Date(inputReq.date.startDate),
						$lt: new Date(inputReq.date.endDate)
					}
				},
				{ $set: { "data.$.weight": 99.2 } },
				{
					projection: {
						data: {
							$filter: {
								input: "$data", // le tableau à limiter
								as: "index", // un alias
								cond: {
									$and: [
										{
											$gte: ["$$index.date", new Date(inputReq.date.startDate)]
										},
										{
											$lte: ["$$index.date", new Date(inputReq.date.endDate)]
										}
									]
								}
							}
						}
					},
					upsert: true,
					returnDocument: "after"
				},
				function (err, person) {
					if (err) {
						console.log("got an error", err);
					}
					console.log({ person });
					res.status(200).send({ data: { message: person } });
				}
			);
 
		} catch (err) {
			res.status(400).json(err);
			throw err;
		}
	}
	
}

export default new UsersController();
