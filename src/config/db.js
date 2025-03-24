const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB");
    }
};

module.exports = connectToDatabase;