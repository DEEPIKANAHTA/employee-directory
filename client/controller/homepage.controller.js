var app = angular.module('Mainapp',  ['ngCookies']);

app.controller('homecontroller' , function($scope , $http, $window, $cookies){
$scope.users = [];
$scope.user = {firstName:"", middleName:"", lastName:"", email:"",dob:"",department:"",gender:"",age:"" };

var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");

$scope.redirectToAddUser = function() {	
	$cookies.remove('user');
	$cookies.remove('showupdate');
	$window.location.href = '/addUser';
}

$scope.getUsers = function() {
	$http.get("/api/getUsers").success(function(r,s,x) {
	$scope.usersdata=r;
	});
};

$scope.getUsers();

//delete user from collection
$scope.deleteUser = function(user) {
	$http({
	url:"/api/deleteUserModel/"+user._id,
	method:"DELETE",
	data:user
	}).success(function(r,s,x){
	console.log("inside delete view controller");	
	$scope.getUsers();
	}).error(function(err){
	console.log("error in deleting",err);
	});
};

$scope.modifyUser = function(user) {
	
	$cookies.putObject('user', user);
	$scope.showUpdateButton=true;
	$cookies.put('showupdate', '$scope.showUpdateButton');
	$window.location.href = '/addUser';
};

});

app.controller('registrationController', function($scope,$http,$cookies,$window){
$scope.users = [];

$scope.user = {firstName:"", middleName:"", lastName:"", email:"",dob:"",department:"",gender:"",age:"" };


var useredit  = $cookies.getObject('user'); 

var showUpdateButton = $cookies.get('showupdate');

if(showUpdateButton){
	$scope.showUpdateButton = showUpdateButton;
}

if(useredit) {
$scope.user = {
		_id:useredit._id,
		firstName:useredit.firstName,
		lastName:useredit.lastName,
		middleName:useredit.middleName, 
		email:useredit.email,
		dob:new Date(useredit.dob),
		department:useredit.department,
		gender:useredit.gender,
		age:useredit.age
	};
}


//calculate age
$scope.calculateAge = function(dob) {
var birthDate = new Date(dob);
var presentDate = new Date();
var age=presentDate.getFullYear()-birthDate.getFullYear();
		
	if(presentDate.getFullYear()-birthDate.getFullYear()>0){
		if(presentDate.getMonth()-birthDate.getMonth()==0){
			if(presentDate.getDate()-birthDate.getDate()<0){
				age=age-1;
			}
		}
		else if(presentDate.getMonth()-birthDate.getMonth()<0){
		age=age-1;
		}
	} else {
		console.log('error in calculating date');//error msg
	}

	$scope.user.age = age;
};

var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");

$scope.createUser = function() {
	console.log("xvggshvx"+$scope.user);
	if(($scope.user.firstName !=="")&&($scope.user.lastName !=="")  && pattern.test($scope.user.email) && ($scope.user.dob !=="") && ($scope.user.department !=="") && ($scope.user.gender !=="")){
	$http({
		method: "POST",
		url :"/api/createUser" ,
		data: $scope.user
	}).success(function(r,s,x){
		$scope.users.push(r);
		$scope.user = { firstName:"", middleName:"", lastName:"", email:"",dob:"",department:"",gender:"",age:"" };
		 window.location = "/";
	}).error(function(err){
		console.log('error in crreating user'+err);
	});
	};
};

//add user from cscopeollection
$scope.updateUser=function() {
	if(($scope.user.firstName !=="")&&($scope.user.lastName !=="")  && pattern.test($scope.user.email) && ($scope.user.dob !=="") && ($scope.user.department !=="") && ($scope.user.gender !=="")){
	$http({
		url:"/api/updateUserModel/"+$scope.user._id,
		method:"PUT",
		data:$scope.user
	}).success(function(user,s,x){
		console.log("inside update view controller");

		$cookies.remove('user');
		$cookies.remove('showupdate');
		$scope.showUpdateButton=false;
		$scope.user={
			name:"",email:"",dob:"",dept:"",gender:"",age:""
		};
		$window.location.href = '/';

	}).error(function(err){
		console.log("error in updating",+err);
	});
	}
};

});