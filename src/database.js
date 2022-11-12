import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);
import User from "./models/users.js";
const database = mongoose.connection;

const seedUsers = {

	name: "sai"
};
const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(seedUsers);
};
database.once("connected", () => {
	seedDB()
		.then(() => {
			// database.close(() => {
			// 	console.log(
			// 		"Mongoose default connection disconnected through app termination"
			// 	);
			// });
		})
		.catch((e) => {
			throw e;
		});
});


export default database;
