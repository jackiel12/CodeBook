const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const eventController = require('./controllers/event-controllers.js')

const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/mongodb-jlsp',{useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('connected to DB mongodb-jlsp')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   });

//use router to redirect requests to appropriate functionality
const dataRouter = express.Router();

//set up route to put new data or update existing
//good explanation here on why to choose put or post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest
dataRouter.post('/add', eventController.createRecord);

//set up route to fetch data by keyword
// dataRouter.get('/', eventController.getRecord);

// dataRouter.put('/', eventController.updateRecord);

dataRouter.delete('/delete', eventController.deleteRecord);

app.use('/data', dataRouter);



// statically serve everything in the build folder on the route '/build'
    
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
    
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


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