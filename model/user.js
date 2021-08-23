const mongoose = require("mongoose");

// User Model for signup
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 128,
    },
});

module.exports = mongoose.model("User", userSchema);
