const mongoose = require("mongoose");
const config = require("../config/db");

const ExcursionShema = mongoose.Schema({
    name:{
        type: String
    },
    src:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true,
    },
    count:{
        type: String
    },
    cost:{
        type: Number,
        required: true
    },
    desc:{
        type: String
    }
});

const Excursion = module.exports = mongoose.model('Excursion', ExcursionShema)