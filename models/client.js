const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
        number: {
            type: Number,
            required: true,
            unique: true
        },
        city: {
            type: String,
            required: true
        },
        price1: {
            type: String,
            required: true
        },
        price2: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        bhk: {
            type: String,
            required: true
        },
        ana: {
            type: String,
            required: true
        },
        bed: {
            type: String,
            required: true
        },
        bath: {
            type: String,
            required: true
        }
    })
    // we need to create collection
const Home = new mongoose.model("Client", userSchema);
module.exports = Home;