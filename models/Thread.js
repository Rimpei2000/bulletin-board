const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
    },
    content: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Thread", ThreadSchema);