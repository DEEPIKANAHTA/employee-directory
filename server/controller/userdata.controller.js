var mongoose=require('mongoose');
var userModel = mongoose.model('User');

module.exports.createUser=function(req,res){
	var user1 = new userModel(req.body);
	user1.save(function(err,result){
	res.json(result);
	});
},


module.exports.getUsers=function(req,res){
	userModel.find({},function(err,result){
	res.json(result);
	});
}

module.exports.updateUser=function(req,res){
	userModel.update(
		{_id:req.body._id},
		req.body,
		null,
		function(err,response){
			console.log("after updating server");
			res.send("updated");
	});
}

module.exports.deleteUser=function(req,res){
	console.log("req inside deleteuser");
	userModel.remove({_id:req.params._id},function(err,removed){
	console.log("removed from serverdb");
	res.send("removed");
	});
	
}

