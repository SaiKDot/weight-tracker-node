import mongoose from "mongoose";

const mongoString = process.env.DATABASE_URL;

console.log({mongoString});

mongoose.connect(mongoString);
const database = mongoose.connection;

export default database;
