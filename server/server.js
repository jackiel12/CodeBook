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
// .then('open',(err) => {
//     if (err) console.log(err);
//     else { console.log('connected with mongodb-jlsp')};
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use router to redirect requests to appropriate functionality
const dataRouter = express.Router();

//set up route to put new data or update existing
//good explanation here on why to choose put or post: https://stackoverflow.com/questions/630453/put-vs-post-in-rest
dataRouter.post('/', eventController.createRecord);

//set up route to fetch data by keyword
// dataRouter.get('/', eventController.getRecord);

// dataRouter.put('/', eventController.updateRecord);

// dataRouter.put('/', eventController.deleteRecord);

app.use('/data', dataRouter);


// statically serve everything in the build folder on the route '/build'
// if(process.env.NODE_ENV === 'production') {
    
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
        console.log('process.env.node_env:',process.env.NODE_ENV);
        res.sendFile(path.join(__dirname, '../index.html'));
    });
// }

app.listen(PORT, () => {console.log(`listening on port: ${PORT}`)});