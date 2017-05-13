var express = require('express');
var config = require( "./server/db.js");
var bodyParser=require("body-parser");
userdataController = require("./server/controller/userdata.controller.js");

var app = express();

app.use(express.static(__dirname + '/public'));

app.use("/js",express.static(__dirname+"/client/controller"));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get("/",function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});


app.get('/addUser',function(req,res){
	res.sendFile(__dirname + '/public/addUser.html');
});

var port = process.env.PORT || 8080;

app.get("/api/getUsers", userdataController.getUsers);

app.post('/api/createUser', userdataController.createUser);

app.delete("/api/deleteUserModel/:_id",userdataController.deleteUser);

app.put("/api/updateUserModel/:_id",userdataController.updateUser);


var server = app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});

