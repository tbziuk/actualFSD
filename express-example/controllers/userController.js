const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    create: (req, res) => {
        const newUser = new User(req.body);
        newUser.save()
            .then(() => {
                res.redirect("/blog");
            })
            .catch(() => {
                res.render("userViews/signupUser", {
                    error: true,
                    message: "User already exist",
                    user: req.body,
                });
            });

    },
    login: async (req, res) => {
        await User.findOne({email: req.body.email})
        .catch(()=> res.send(`Login error`))
        .then((user)=>{
            if(!user){
                res.render("userViews/loginUser", {
                    error: true,
                    message: "User doesn't exist",
                    user: req.body,
                });
                return;
            } else {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if(err){
                        res.render("userViews/loginUser", {
                            error: true,
                            message: "Login error",
                            user: {email: req.body.email, password: ''},
                        }); 
                        return;
                    }
                    if(logged){
                        const token = user.generateAuthToken(user);
                        res.cookie('AuthToken', token);
                        res.redirect('/blog');
                    } else {
                        res.render("userViews/loginUser", {
                            error: true,
                            message: "Incorrect login or password",
                            user: {email: '', password: ''},
                        }); 
                        return;
                    }
                })
            }
        })
    },
    logout: (req, res) => {
    res.clearCookie('AuthToken');
    res.redirect("/user/login");
    }
};