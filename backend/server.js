require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const { stringify } = require('uuid');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser: true, useUnifiedTopology: true});

const postSchema={
    id:String,
    title: String,
    content: String
}

const Post=mongoose.model("Post", postSchema);

app.get("/", function(req, res){
    Post.find({}, function(err, results){
        res.send(results);
    })
});
app.delete("/", function(req, res){
    Post.findOneAndDelete({id:req.body.id}, function(err){
        if(!err){
            res.send("Successfully deleted");
        }
    })
});
app.post("/", function(req, res){
    const post=new Post({
        id:req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.send("Added Successfully");
})


app.listen(5000, function() {
  console.log("Server started on port 5000");
});