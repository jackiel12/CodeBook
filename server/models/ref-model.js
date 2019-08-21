const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/mongodb-jlsp');
// mongoose.connection.once('open',() => {
//     console.log('connected with mongodb-jlsp');
// })

const ReferenceSchema = new Schema ({
    url: {type: String, required: true},
    description: {type: String, required: true},
    keywords: {type: String, required: true}
    //keywords can be a string input. you can trim the spaces and split it into an array yourself
})

module.exports = mongoose.model('Reference', ReferenceSchema);