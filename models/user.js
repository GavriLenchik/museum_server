const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/db");

const UserShema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false
    }
});

const User = module.exports = mongoose.model('User', UserShema)

module.exports.getUserByLogin = function(login){
    User.findOne({login: login}).select('+password').then((user)=>{
        console.log(user);
    });
};

module.exports.addUser= function(newUser){
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save();
        })
    })
    return true;
};