import {weightSchema } from "../src/models/weights.js"

export const  up  = async (db, client) => {
	return db.createCollection("weights", weightSchema);
};

export const down = async(db, client) => {
	return db.weights.drop();
}

