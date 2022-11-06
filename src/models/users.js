import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	id: {
		type: Number
	},
	name: {
		type: String
	}
});

const Users = mongoose.model("users", usersSchema);
export default Users;