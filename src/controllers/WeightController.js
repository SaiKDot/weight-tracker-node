import Weights from "../models/weights.js";
import mongoose from "mongoose";
class WeightsController {
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

   async insert(req,res){
      
         const campaign = {
						userId: mongoose.Types.ObjectId(req.body.userId),
						date: new Date(req.body.date).setHours(0, 0, 0, 0),
						weight: req.body.weight
					};
    
    // Weights.findOneAndUpdate(
	// 		{ userId: req.body.userId, date: req.params.date },
	// 		campaign,
	// 		{ upsert: true, new: true },
	// 		(err, res) => {
	// 			console.log(res);
    //             res.json({success : "sue"});
	// 		}
	// 	);
         try {
           Weights.findOneAndUpdate(
							{
								userId: mongoose.Types.ObjectId(req.body.userId),
								date: new Date(req.body.date).setHours(0, 0, 0, 0)
							},
							{ $set: campaign },
							{ new: false, upsert: true },
							(err, doc) => {
								if (err) {
									console.log("Something wrong when updating data!");
								}

								console.log(doc);
							}
						);
            res.status(200).json({
                success: "true",
                
            });
        } catch (err) {
            res.status(400).json(err);
            throw err;
        }
        
        

    }
}


export default new WeightsController();
