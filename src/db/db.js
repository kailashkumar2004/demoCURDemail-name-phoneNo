const mongoose = require("mongoose");

class Database {
    constructor() {
        this.db_connect();
    }

    async db_connect() {
        try {
            this.database = await mongoose.connect("mongodb://127.0.0.1:27017/mahi", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Database connect successfully");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }
}

module.exports = new Database();
