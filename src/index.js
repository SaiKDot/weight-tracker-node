import "dotenv/config.js";
import express from "express";
import database from "./database.js";
 
import router from "./router.js";

import User from "./models/users.js";





database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("database connected");
	const app = express();
	app.use(express.json());
	app.listen(8000, () => {
		console.log(`Server Started at ${8000}`);
	});
});

const seedUsers = {
	id: 1,
	name: "sai"
};
const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(seedUsers);
};
seedDB().then(() => {
	database.close(() => {
		console.log("Mongoose default connection disconnected through app termination");
	});
});
 


router.post("/post", (req, res) => {
	res.send("Post API");
});

//Get all Method
router.get("api/weight/:userId", (req, res) => {
	res.send(req);
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
	res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
	res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
	res.send("Delete by ID API");
});

