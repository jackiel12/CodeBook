const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myURI = "mongodb+srv://jackie_lin128:yRZFzbpz7gl5XTwc@cluster0-0ee2u.mongodb.net/CodeBook"

const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to DB Mongoose')
})

const ReferenceSchema = new Schema ({
    name: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array, required: true}
    //keywords can be a string input. you can trim the spaces and split it into an array yourself
}, {timestamps: true})

module.exports = mongoose.model('Reference', ReferenceSchema);