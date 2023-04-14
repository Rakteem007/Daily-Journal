//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require('lodash');
const mongoose= require('mongoose');

//mongoDB connect
 mongoose.connect(process.env.URL);

// mongosh connect
// mongoose.connect("mongodb://localhost:27017/journalDB");

//journal schema
const journalSchema=new mongoose.Schema({
  title : String,
  description : String
});

//journa model
const Journal=mongoose.model("Journal",journalSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts=[];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//home page
app.get('/',async function(req,res){

  posts=await Journal.find({});
  
  res.render('home',{homeContent:homeStartingContent, postDetails : posts});
  // res.send('<h1>Home</h1>');
});

//routing
app.get('/posts/:feeds',async function(req,res){
  
     const requestedID = req.params.feeds;

     const requestedPost = await Journal.findById(requestedID);

     res.render("post",{feedTitle : requestedPost.title , feedPost : requestedPost.description});
});

//about page
app.get('/about',function(req,res){
  res.render('about',{ contentAbout : aboutContent});
});

//contact us page
app.get('/contact',function(req,res){

  res.render('contact',{contentContact : contactContent});
});

//compose page
app.get('/compose',function(req,res){

   res.render('compose');
});

app.post('/compose',function(req,res){

   let title=req.body.title;
   let post=req.body.post;

  //  var contentPost={
  //     "title" : title,
  //     "post" : post,
  //  };
  //   posts.push(contentPost);

   const contentPost=new Journal({
     title : title,
     description : post
   });

   contentPost.save().then(()=>{
      res.redirect('/');
   });
   
});

    app.listen(3000, function() {
  console.log("Server started on port 3000");
});
  

