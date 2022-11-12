import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const weightSchema = new Schema({
	date: {
		type: Date,
		required: false
	},
	weight: {
		type: Number,
		required: true
	},
	userId: { 
		type: mongoose.Schema.Types.ObjectId, ref: "users"
	}
},{ versionKey: false, timestamps: true });

const Weight = mongoose.model("weights", weightSchema);
export default Weight;