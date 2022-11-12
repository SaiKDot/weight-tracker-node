import "dotenv/config.js";
import express from "express";
import database from "./database.js";
import router from "./router.js";



// import User from "./models/users.js";

import UsersController from "./controllers/UsersController.js";
import WeightsController from "./controllers/WeightController.js";



database.once("connected", () => {
	// console.log("database connected");
	const app = express();
	app.use(express.json());
	app.use(router);
	app.listen(8000, () => {
		console.log(`Server Started at ${8000}`);
	});
});


database.on("error", (error) => {
	throw error;
});
 
router.get("/app", function (req, res,next) {
	console.log("Router Working");
	// UsersController.test(req, res, next);
	res.end();
});

 


//Get all Method
router.get("/api/weight/:userId", (req, res) => {
	res.send(req.params);
});

//Get by ID Method
router.get("/user/:id", UsersController.findOne);

//Update by ID Method
router.patch("/post/:id", (req, res) => {
	res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
	res.send("Delete by ID API");
});

router.post("/api/weight/new", WeightsController.insert);


