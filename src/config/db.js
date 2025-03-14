const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Conexión a MongoDB exitosa")
    } catch (error) {
        console.log("Error al conectar con MongoDB")
    }
}

module.exports = connectToDatabase