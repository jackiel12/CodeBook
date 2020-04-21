const Reference = require('../models/ref-model.js');

//create a controller
const eventController = {
    //make a function to add the data to the db
    createRecord(req, res) {
        // console.log('req.body',req.body);
        const reference = new Reference ({
            name: req.body.name,
            url: req.body.url,
            description: req.body.description,
            tags: req.body.tags.split(',')
        })

        reference.save(function(err, reference) {
            if(err) { console.log('err',err);
            res.status(404);}
            else{res.json(reference);}
            
        })
    },
    
    //make a function to update the data in the db (maybe an edit button)
    updateRecord(req, res) {

    },

    deleteRecord(req, res) {
        //takes a request, finds the data and removes it from the db
        Reference.findOneAndDelete({url: req.body.url},function(err, reference) {
            if (err) res.status(404).json({error: err})
            res.json({sucess: true, msg: `deleted ${reference}`});
        })
    },

    //retrieve records by keywords
    getRecords(req, res, next) {
        let reqTags = req.params.tags.split(',')
        let resultArr = [];
        // console.log('req.params',req.params)
        Reference.find({tags: { $in: reqTags} }, (err, cursor) => {
            if (err) res.status(404)
            else {
                console.log('this is the cursor from find', cursor)
                res.json(cursor);
            }
        })
    }

}

module.exports = eventController;