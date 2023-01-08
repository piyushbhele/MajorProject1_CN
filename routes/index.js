//set up express server and export
const express = require('express');
const router = express.Router();


//get cation from controller
const homeController = require('../controllers/home_controller');

//render the home page
router.get('/', homeController.home);

//create and delete tasks
router.post('/create-tasks', homeController.createTask);
router.get('/delete-task/', homeController.deleteTask);

//for any further routs, access from here
//router.use('/routerName',require('./routefile'));
//whenever request for users
router.use('/', require('./users'));
router.use('/', require('./posts'));
router.use('/', require('./comments'));

//export router to aap.use
module.exports = router;

console.log('router loaded');