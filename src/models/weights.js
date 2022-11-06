import mongoose from "mongoose";
const Schema = mongoose.Schema;

const weightSchema = new Schema({
	date: {
		type: Date,
		required: false
	},
	userId: { 
		type: mongoose.Schema.Types.ObjectId, ref: "users"
	}
},{ timestamps: true });

const Weight = mongoose.mondel("weights", weightSchema);
export default Weight;