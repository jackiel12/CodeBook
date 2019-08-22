const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-jlsp');
// mongoose.connection.once('open',() => {
//     console.log('connected with mongodb-jlsp');
// })

// mongoose.connect('mongodb://127.0.0.1:27017/mongodb-jlsp',{useNewUrlParser: true})
// mongoose.connection.once('open', () => {
//     console.log('connected to DB mongodb-jlsp')
// })

const ReferenceSchema = new Schema ({
    name: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: Array, required: true}
    //keywords can be a string input. you can trim the spaces and split it into an array yourself
}, {timestamps: true})

module.exports = mongoose.model('Reference', ReferenceSchema);