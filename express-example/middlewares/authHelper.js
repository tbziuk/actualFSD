const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

module.exports = async (req, res, next) => {

    const token = req.cookies['AuthToken'];

    try {

        if (!token) {
            res.redirect("/user/login?loginRedirect=true");
        } else {
            const decoded = jwt.verify(token, 'secret');
            const user = await User.findById(decoded._id).exec();

            if (!user) {
                return res.redirect('/user/login?loginRedirect=true');
            }

            res.locals.userId = decoded._id;
            res.locals.userName = user.name;
            next();
        }

    } catch {
        res.redirect("/user/login?loginRedirect=true");
    }
}