//set up express server and export
const express = require('express');
const router = express.Router();


//get cation from controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
//for any further routs, access from here
//router.use('/routerName',require('./routefile'));
//whenever request for users
router.use('/', require('./users'));
router.use('/', require('./posts'));

//export router to aap.use
module.exports = router;

console.log('router loaded');