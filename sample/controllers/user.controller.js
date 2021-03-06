const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const nodemailer = require('nodemailer');
const config = require('../config/mailer.config');
const mailer = require('../misc/mailer');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    // console.log(req.body);
    var user = new User();
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.id = req.body.id;
    user.email = req.body.email;
    user.tp = req.body.tp;
    user.role = req.body.role;
    user.userPic = req.body.userPic;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) {

            mailer.sendEmail(
                'hasita0@gmail.com',
                'Welcome to Vilmic Lake Inn',
                doc.email,
                'Welcome to Vilmic Lake inn, You are registerd with our hotel facility.'
            )


            res.send(doc);
        }
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

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else {
                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'fName', 'lName', 'email', 'id', 'tp', 'role', 'userPic']) });
            }

        }
    );
}


// get user by document ID

module.exports.findByDocumentIDS = (req, res, next) => {
    User.findById(req.params._id, (err, doc) => {
        if (!err) { res.send(doc); }

        else { console.log('Error in finding') }
    })
}





module.exports.getuserbyid = (req, res, next) => {
    User.findById(req.body._id,
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else {
                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'fName', 'lName', 'email', 'id', 'tp', 'role', 'userPic']) });
            }

        }
    );
}



module.exports.upuser = (req, res, next) => {
    User.findByIdAndUpdate(req.body._id,
        {
            $set: { lName: req.body.lName, fName: req.body.fName, tp: req.body.tp, id: req.body.id, email: req.body.email, userPic: req.body.userPic }
        },
        {
            new: true
        },

        (err, user) => {
            if (err)
                res.status(500).json({ errmsg: err });
            else {
                res.status(200).json({ msg: user })
            }
        })
}