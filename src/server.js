// // server.js
// const express = require('express');
// const app = express();
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser = require("body-parser");
// app.use(bodyParser());
// const password = "L95ddjbTxcZgGpho";
// const connectionString = `mongodb+srv://user:${@cluster0-dh8wy.mongodb.net">password}@cluster0-dh8wy.mongodb.net/ColesDb?retryWrites=true&w=majority`;
// MongoClient.connect(connectionString, {useUnifiedTopology: true})
//   .then(client => {
//     console.log("Connected to Database");
//   })

import express from "express";
 
const app = express();

app.use(express.json());

app.listen(8000, () => {
	console.log(`Server Started at ${3000}`);
});

 