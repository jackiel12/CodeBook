const express = require('express');
const dataRouter = require('./dataRouter.js')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use router to redirect requests to appropriate functionality
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