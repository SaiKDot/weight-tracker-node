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
}

export default new UsersController();
