const path = require('path');
const firebase = require('firebase');
const express = require('express');
const router = express.Router();
//const addRow = require('./public/scripts/script');
const config = {
    apiKey: 'AIzaSyDMDAEyzR_JoZH2DALGyHeGaCHXcgGxl9g',
    authDomain: 'attendance-register-38ad7.firebaseapp.com',
    databaseURL: 'https://attendance-register-38ad7.firebaseio.com',
    storageBucket: 'attendance-register-38ad7.appspot.com',
    messagingSenderId: '826903044656'
};
firebase.initializeApp(config);

const database = firebase.database();
router.get('/', function(req,res){
    console.log('Hello');
})
module.exports = function(app){
    app.get('/', function(req,res){
        res.render('pages/checkin');
        console.log('Gotten');
    })
    app.get('/', function(){
        res.render('pages/homepage');
    })
    app.get('/register', function(req,res){
        res.render('pages/register');
    })
    app.get('/signin', function(req,res){
        res.render('pages/signin');
    })
    app.get('/dashboard', function(req,res){
        res.render('pages/dashboard');
    })
    app.get('/create', function(req,res){
        res.render('pages/create')
    })

    // Post Methods
    //app.post('/checkin' )
    app.post('/', function(req,res){
        home(req,res);
    })
    app.post('/signin', function(req,res){
        signin(req,res);
    })
    app.post('/dashboard', function(req,res){
        dashboard(req,res);
    })
    app.post('/register', function(req,res){
        register(req,res);
    })
    app.post('/create', function(req,res){
        create(req,res);
    })
}
function checkIn(req,res,eventId){
    const name = req.body.name;
    const email = req.body.email;
    const timeIn = getTime();
    const id = genId();
    addAttendee(timeIn,name,email,id);
    const present = getAttendees();
    res.render('pages/checkin',attendees);
}
function home(req,res){
    console.log('Homepage');
}
function signin(req,res){
    console.log('Signing In');
}
function dashboard(req,res){
    console.log('Dashboard');
}
function register(req,res){
    console.log('Register');
}
function create(req,res){
    console.log('Creating');
}
/*
// EXPORTS
module.exports.get = function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
};
module.exports.getDashboard = function(req,res){
    res.sendFile(path.join(__dirname+'/views/dashboard.html'));
}
module.exports.getSignin = function(req,res){
    res.sendFile(path.join(__dirname+'/views/signin.html'));
}
module.exports.getHomepage = function(req,res){
    res.sendFile(path.join(__dirname+'/views/homepage.html'));
}
module.exports.getRegister = function(req,res){
    res.sendFile(path.join(__dirname+'/views/register.html'));
}
module.exports.post = function(req,res){
    name = req.body.name;
    email = req.body.email;
    timeIn = getTime();
    id = genId();
    addAttendee(timeIn,name,email,id);
	console.log(req.body.name + ' ' + timeIn);
	//addRow.addRow();
	//res.sendFile(path.join(__dirname+'/views/index.html'));
    getAttendees();
}

module.exports.postDashboard = function(req,res){
    console.log('postDashboard');
}
module.exports.postSignin = function(req,res){
    console.log('postSignin');

}
module.exports.postHomepage= function(req,res){
    console.log('postHomepage');
}
module.exports.postRegister = function(req,res){
    console.log('postRegister');
}
module.exports.postSearch = function(req,res){
    console.log('postSearch');0
}
*/
function genId(){
    const id = Math.floor((Math.random()*1000) + 1);
    if(id > 100){
        return id;
    } else if(id >10){
        return '0' + parseInt(id);
    } else if (id > 1){
        return '00' + parseInt(id);
    }
}
function addAttendee(timeIn, name, email, id, eventCode){
    const attendee = {
        timeIn:timeIn,
        name:name,
        email:email,
        id:id
    }
    firebase.database().ref('attendees/').set(attendee);
}

function getAttendeesCount(eventCode){
    const attendees = firebase.database().ref('attendees/');
    attendees.on('value', function(snapshot) {
        console.log(snapshot.val());
    });
    const attendeesCount = Object.keys(attendees).length;
    //console.log(Object.keys(attendeesCount));
    return attendeesCount;
}

function getTime(){
	const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    let time = hours + ':' + minutes +' ';
    if(hours > 11){
        time+='PM';
    } else {
        time+='AM'
    }
    return time;
}

function getAttendees(){
    const allAttendees = null;
    const attendees = firebase.database().ref('attendees/');
    attendees.on('value', function(snapshot) {
        console.log(snapshot.val());
        allAttendees = snapshot.val();
    });
    return allAttendees;

}

function getEvents(){

}
