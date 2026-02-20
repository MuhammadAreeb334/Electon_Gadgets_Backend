const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    }
})

module.exports = mongoose.model("User", User);