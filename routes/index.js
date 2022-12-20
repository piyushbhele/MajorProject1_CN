//set up express server and export
const express = require('express');
const router = express.Router();

//get cation from controller
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

//export router to aap.use
module.exports = router;

console.log('router loaded');