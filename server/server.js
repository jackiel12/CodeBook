const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const eventController = require('./controllers/event-controllers.js')

const PORT = process.env.PORT || 3434;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use router to redirect requests to appropriate functionality
const dataRouter = express.Router();

//set up route to put new data or update existing
//good explanation here on why to choose put or post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest
dataRouter.post('/add', eventController.createRecord);

//set up route to fetch data by keyword
dataRouter.get('/search/:tags', eventController.getRecords);

dataRouter.delete('/delete', eventController.deleteRecord);

app.use('/data', dataRouter);

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '../')));
  //serve the bundle from the dist folder
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
}


app.use(function (err, req, res, next) {
    defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
    }
    const errorObj = Object.assign(defaultErr, ...err);
    console.log(errorObj.log);
    res.status(errorObj.status).send(JSON.stringify(errorObj.message));
  })

app.listen(PORT, () => {console.log(`listening on port: ${PORT}`)});