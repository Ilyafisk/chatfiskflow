const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MONGODB РАБОТАЕТ!");
    } catch (error) {
        console.error("Ошибка подключения к Mongodb", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
