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
            else{
                console.log('reference added: ', reference)
                res.status(200).json(reference);
            }
            
        })
    },
    
    deleteRecord(req, res) {
        console.log('in the deleteRecord')
        //takes a request, finds the data and removes it from the db
        Reference.findByIdAndRemove(req.body.id)
        .then((data, err)=> {
            res.status(200).json(data)
            console.log('item has been deleted')
        })
        .catch((err)=> {
            console.log('Delete Error:', err)
            res.status(500).send('There was an error deleting the message')
        })
    },

    getAllRecords(req,res,next) {
        
        Reference.find({}, (err, dbRes)  => {
            if(err) res.status(500).send('There was an error getting messages from DB')
            res.status(200).json(dbRes)
        })
    },

    //retrieve records by keywords
    getSearchRecords(req, res, next) {
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