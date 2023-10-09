const mongoose = require('mongoose');
require('dotenv').config();
const DB_USERNAME="brijesh"
const DB_PASSWORD="brijeshbri01"
const url =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster.zomvxwg.mongodb.net/Blood-bank`
mongoose.connect(url,{
    useNewUrlParser : true,
    useunifiedTopology : true
});

const connection = mongoose.connection;
//verify connection
connection.on('connected', () => {
  console.log("mongo db connection succesfull");
});
//verify connection error

connection.on('error', (err) => {
  console.log("mongo db connection faliled", err);
});
