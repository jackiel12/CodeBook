const Reference = require('../models/ref-model.js');

//create a controller
const eventController = {
    //make a function to add the data to the db
    createRecord(req, res) {
        console.log('req.body',req.body);
        const reference = new Reference ({
            url: req.body.url,
            description: req.body.description,
            keywords: req.body.keywords
        })

        reference.save(function(err, reference) {
            if(err) res.status(404);
            res.json(reference);
        })
    },
    
    //make a function to update the data in the db (maybe an edit button)
    updateRecord(req, res) {

    },

    deleteRecord(req, res) {

    },

    getRecord(req, res) {

    }

}

module.exports = eventController;