import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);
import User from "./models/users.js";
import Weight  from "./models/weights.js";
const database = mongoose.connection;
import seedWeights from "./weightSeed.json" assert { type: "json" };


function modWeight(ndate) {
	 const dater = new Date(ndate);
	 dater.setHours(0, 0, 0, 0);
	 const date = dater.toISOString();
	 return date;
	 
}
  seedWeights.forEach((weight) => {
		weight.userId = '';
		weight.date = modWeight(weight.date)
	});

const seedUsers = {
	name: "sai",
	data: seedWeights
};

const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(seedUsers);
 
};
// database.once("connected", () => {
// 	seedDB()
// 		.then(() => {
// 			// database.close(() => {
// 			// 	console.log(
// 			// 		"Mongoose default connection disconnected through app termination"
// 			// 	);
// 			// });
// 		})
// 		.catch((e) => {
// 			throw e;
// 		});
// });


export default database;
