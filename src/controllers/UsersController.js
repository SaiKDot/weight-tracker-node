import Users from "../models/users.js";
import mongoose from "mongoose";
class UsersController {
	constructor() {
		this.findOne = this.findOne.bind(this);
	}

	findOne(req, res) {
		const id = new mongoose.Types.ObjectId(req.params.id);
		Users.findById(id, function (err, workout) {
			if (err) res.send(err);
			res.setHeader("Content-Type", "application/json");
			res.json(workout);
		});
	}
	insertWeight(req, res) {
		const dateString = req.body.date;
         const campaign = {
						 
						date: new Date(req.body.date).setHours(0, 0, 0, 0),
						weight: req.body.weight
					};
		const id = new mongoose.Types.ObjectId(req.body.userId);
		const date = new Date(req.body.date);
		date.setUTCHours(0, 0, 0, 0);
		const startDate = date.toISOString();
		const endDate = new Date(date.setDate(date.getDate() + 1)).toISOString();
			console.log( startDate , endDate);		
		try {
			// Users.findOneAndUpdate(
			// 	{ _id: id, "weights.date": date },
			// 	{ $set: { "weights.$weight" : campaign.weight } },
			// 	{ new: false, upsert: true },
			// 	(err, doc) => {
			// 		if (err) {
			// 			console.log("Something wrong when updating data!", err);
			// 		}

					 
			// 	}
			// );
			// res.status(200).json({
			// 		success: "true"
			// 	});

 

				Users.aggregate([
					{ $match: { _id: id } },
					{
						$project: {
							data: {
								$filter: {
									input: "$data", // le tableau à limiter
									as: "index", // un alias
									cond: {
										$and: [
											{
												$gte: ["$$index.date", new Date(startDate)]
											},
											{
												$lte: ["$$index.date", new Date(endDate)]
											}
										]
									}
								}
							}
						}
					}
				])
					.project({ "data.date": 1, "data.weight": 1 })
					.then((result) => {
						res.status(200).send({ data: { message: result } });
					});
		
			// res.status(200).json({
			// 		success: "true"
			// 	});
		} catch(err) {
				res.status(400).json(err);
				throw err;
		}

	}
}

export default new UsersController();
