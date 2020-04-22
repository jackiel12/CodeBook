const express = require('express')
const dataRouter = express.Router();
const eventController = require('./controllers/event-controllers.js')

//set up route to put new data or update existing
//good explanation here on why to choose put or post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest
dataRouter.post('/add', eventController.createRecord);

dataRouter.get('/getRecords', eventController.getAllRecords);

//set up route to fetch data by keyword
dataRouter.get('/search/:tags', eventController.getSearchRecords);

dataRouter.delete('/deleteRecord', eventController.deleteRecord);

module.exports = dataRouter;