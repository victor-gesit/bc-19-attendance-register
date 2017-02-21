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

var database = firebase.database();

// EXPORTS
module.exports.get = function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
};

module.exports.post = function(req,res){
    name = req.body.name;
    email = req.body.email;
    timeIn = getTime();
    id = genId();
    addAttendee(timeIn,name,email,id);
	console.log(req.body.name + " " + timeIn);
	//addRow.addRow();
	//res.sendFile(path.join(__dirname+'/views/index.html'));
    getAttendees();
}

var genId = function(){
    var id = Math.floor((Math.random()*1000) + 1);
    if(id > 100){
        return id;
    } else if(id >10){
        return '0' + parseInt(id);
    } else if (id > 1){
        return '00' + parseInt(id);
    }
}
function addAttendee(timeIn, name, email, id){
    var attendee = {
        timeIn:timeIn,
        name:name,
        email:email,
        id:id
    }
    firebase.database().ref('attendees/' + id).set(attendee);
}

getAttendees = function(){
    var attendees = firebase.database().ref('attendees/');
    attendees.on('value', function(snapshot) {
        console.log(snapshot.val());
    });
    var attendeesCount = Object.keys(attendees).length;
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

