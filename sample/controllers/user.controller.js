const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.id = req.body.id;
    user.email = req.body.email;
    user.tp = req.body.tp;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    //passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fName','lName','email','id','tp']) });
        }
    );
}

module.exports.upuser = (req, res, next) => {
    User.findById(req.body._id, (err, user) => {
        if (err)
            res.status(500).json({ errmsg: err });
        user.lName = req.body.lName;
        user.fName = req.body.fName;
        user.tp = req.body.tp;
        user.id = req.body.id;
        user.email = req.body.email;
        user.password = req.body.password;
        user.saltSecret = req.body.saltSecret;
        user.save((err, user) => {
            if (err)
                res.status(500).json({ errmsg: err });

            res.status(200).json({ msg: user })
        })
    })
}