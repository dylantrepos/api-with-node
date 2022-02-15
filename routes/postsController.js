const express = require("express");
const router = express();
const ObjectID = require("mongoose").Types.ObjectId;

const { PostsModel } = require("../models/postsModel");

router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
       if(!err) res.send(docs);
       else console.error(`Error to get data ${err}`);
    })
});

router.post('/', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    newRecord.save((err, docs) => {
        if(!err) res.send(docs);
        else console.error(`Error creating new data ${err}`);
    });
});

// Make an update from a valid ID
router.put("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)) return (res.status(400).send(`ID unknow : ${req.params.id}`));
    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };
    PostsModel.findByIdAndUpdate(
        req.params.id, 
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if(!err) res.send(docs);
            else console.error(`Update error : ${err}`);
        }
        );
});

// Remove an element from a valid ID
router.delete("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)) return (res.status(400).send(`ID unknow : ${req.params.id}`));
    PostsModel.findByIdAndDelete(
        req.params.id,
            (err, docs) => {
                if(!err) res.send(docs);
                else console.error(`Delete error : ${err}`);
            }
        ) 
})

module.exports = router;