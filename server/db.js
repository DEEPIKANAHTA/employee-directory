var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var dbURI = 'mongodb://employeeDetails:admin@ds129651.mlab.com:29651/employeedirectory';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});


var userSchema = new mongoose.Schema({
		firstName:String,
		middleName:String,
		lastName:String,
		email:String,
		dob:String,
		department:String,
		gender:String,
		age:Number
	
});

 mongoose.model('User', userSchema );