const express = require('express');
const router = express.Router();
const multer = require('multer');


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
router.get('/roomCartDetails', ctrlcartR.roomcartDetails) ;

// router.get('/getUserByDocumnetID',jwtHelper.verifyJwtToken, ctrlUser.getUserByDocumentID);
router.get('/getuserbyid', ctrlUser.getuserbyid);

//////////////
router.get('/findRoomByDocumnetID/:_id', ctrlAddroom.findByDocumentIDS);
router.get('/getUserByID/:_id',ctrlUser.findByDocumentIDS);


router.get('/rooms', ctrlAddroom.rooms);
router.get('/rates', ctrlRating.rates);
router.get('/foods', ctrlAddfood.foods);
router.get('/carts', ctrlcartR.carts);

router.put('/uproom',ctrlAddroom.uproom);
router.put('/upfood',ctrlAddfood.upfood);

router.put('/upuser',ctrlUser.upuser);

router.delete('/delete/:_id',ctrlAddroom.delete);
router.delete('/deletefood/:_id',ctrlAddfood.deletefood);
router.delete('/deleteitem/:_id',ctrlRating.deleteitem);



module.exports = router;




