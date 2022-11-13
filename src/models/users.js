import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const usersSchema = new Schema(
	{
		name: {
			type: String
		},
		data: [
			{
				date: {
					type: Date,
					required: false
				},
				weight: {
					type: Number,
					required: true
				}
			}
		]
	},
	{ versionKey: false, timestamps: true }
);

const Users = mongoose.model("users", usersSchema);
export default Users;