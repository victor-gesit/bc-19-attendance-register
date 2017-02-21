var path = require('path');
var firebase = require('firebase');
var addRow = require('./public/scripts/script');
var config = {
    apiKey: "AIzaSyDMDAEyzR_JoZH2DALGyHeGaCHXcgGxl9g",
    authDomain: "attendance-register-38ad7.firebaseapp.com",
    databaseURL: "https://attendance-register-38ad7.firebaseio.com",
    storageBucket: "attendance-register-38ad7.appspot.com",
    messagingSenderId: "826903044656"
};
firebase.initializeApp(config);
module.exports.get = function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
};

module.exports.post = function(req,res){

	time = getTime();

	console.log(req.body.name + " " + time);
	//addRow.addRow();
	//res.sendFile(path.join(__dirname+'/views/index.html'));
}

var getTime = function(){
	var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes +" ";
    if(hours > 11){
        time+="PM";
    } else {
        time+="AM"
    }
    return time;
}
