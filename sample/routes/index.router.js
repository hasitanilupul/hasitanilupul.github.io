const express = require('express');
const router = express.Router();
const multer = require('multer');   

const DIR ='./public';

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, DIR);
    },
    filename:(req, file, cb) => {
        const fileName = Date.now() + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


var upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) =>{
        if(file.mimetype == "image/png" || file.mimetype =="image/jpg" || file.mimetype == "image/jpeg"){
            cb(null, true);
        }else{
            cb(null,false);
            return cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
        }
    }
});

// router.post('/upload', upload.single('test'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host');
//     res.send({ url: url +'/public/' + req.file.filename });
// }) testing



const ctrlUser = require('../controllers/user.controller');
const ctrlAddroom = require('../controllers/addroom.controller');
const ctrlRating = require('../controllers/rating.controller');
const ctrlAddfood = require('../controllers/addfood.controller');
const ctrlcartR = require('../controllers/cartR.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/newroom', ctrlAddroom.newroom);
router.post('/newrate',  ctrlRating.newrate);
router.post('/newfood', ctrlAddfood.newfood);
router.post('/newcartR', ctrlcartR.newcartR);


router.post('/authenticate', ctrlUser.authenticate);

router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/rateDetails', ctrlRating.ratingDetails);
router.get('/foodDetails', ctrlAddfood.foodDetails);

router.get('/rooms', ctrlAddroom.rooms);
router.get('/rates', ctrlRating.rates);
router.get('/foods', ctrlAddfood.foods);

router.put('/uproom',ctrlAddroom.uproom);
router.put('/upfood',ctrlAddfood.upfood);

router.put('/upuser',ctrlUser.upuser);

router.delete('/delete/:_id',ctrlAddroom.delete);
router.delete('/deletefood/:_id',ctrlAddfood.deletefood);
router.delete('/deleteitem/:_id',ctrlRating.deleteitem);



module.exports = router;




