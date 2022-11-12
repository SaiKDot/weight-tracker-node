import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const usersSchema = new Schema({
	
	name: {
		type: String
	}
});

const Users = mongoose.model("users", usersSchema);
export default Users;