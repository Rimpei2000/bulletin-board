const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Thread = require("./models/Thread");
const PORT = 5500;
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE)
.then(() => console.log("db connected"))
.catch((err) => console.log(err));

app.get("/api/v1/threads", async(req, res) => {
    try {
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads);
    } catch (err) {
        console.log(err);
    }
})

app.post("/api/v1/thread", async(req, res) => {
    try {
        const newThread = await Thread.create(req.body);
        res.status(200).json(newThread);
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, console.log("server running"));