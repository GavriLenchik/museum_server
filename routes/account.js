const express = require("express");
const router = express.Router();
const User = require('../models/user')
const Book = require('../models/book')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const bcrypt = require("bcryptjs");

router.post('/reg', (req, res) =>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });

    if(!User.addUser(newUser)){
        res.json({success: false, msg: "Користувача не було додано!"})
    }
    else
    res.json({success: true, msg: "Користувача додано!"})
})

router.post('/auth', (req, res) =>{
    const login = req.body.login;
    const password = req.body.password;

    User.findOne({login: login}).select('+password').then((user)=>{
        if(!user)
        return res.json({success: false, msg: "На жаль, такого користувача не знайдено."})

        console.log(user);
        bcrypt.compare(password, user.password, (err, isMatch) =>{
            if(err)throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name:user.name,
                        login:user.login,
                        email:user.email
                    }
                })
            }
            else
            return res.json({success: false, msg: "Паролі не співпадають!"})
        }
        )
    })
})

router.get('/books', (req, res) =>{
    Book.find({}).then((data) =>{
        res.json(data);
    })
})

module.exports = router;