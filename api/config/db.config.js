//import dotenv from 'dotenv';
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('../logger/api.logger');

const connect = () => {

    //const connectionString = process.env.MONGO_CONNECTION_STRING;
    //logger.info("process.env.MONGO_CONNECTION_STRING :::" + process.env.MONGO_CONNECTION_STRING);
    dotenv.config()
    const connectionString = process.env.MONGO_CONNECTION_STRING
    logger.info("MONGO_CONNECTION_STRING DIEGO :::" + connectionString);

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });
      
    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
    });
}

const disconnect = () => {
    
    if (!mongoose.connection) {
      return;
    }
    
    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Diconnected  to database");
    });

};

module.exports = {
    connect,
    disconnect
}