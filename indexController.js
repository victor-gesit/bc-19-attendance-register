const path = require('path');
const firebase = require('firebase');
const express = require('express');
const router = express.Router();
const async = require('async');
const config = {
    apiKey: 'AIzaSyDMDAEyzR_JoZH2DALGyHeGaCHXcgGxl9g',
    authDomain: 'attendance-register-38ad7.firebaseapp.com',
    databaseURL: 'https://attendance-register-38ad7.firebaseio.com',
    storageBucket: 'attendance-register-38ad7.appspot.com',
    messagingSenderId: '826903044656'
};
firebase.initializeApp(config);

const database = firebase.database();
var allPresent ={};
module.exports = function(app){
    app.get('/', function(req,res){
        //async.series([getAttendees('ABPD'),renderPage(res,'/',obj)]);
        getAttendees(function(data){
            console.log('from get(): ' + data);
            const obj = {
                count:data.length,
                eventName:'Andela  BTC',
                data:data
            }
            res.render('pages/checkin',obj);
        })
    });

    // Other Unimplemented Routes
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
    app.post('/', function(req,res){
        checkIn(req,res);
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
function home(req,res){
    checkIn(req,res);
}
function checkIn(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const timeIn = getTime();
    const id = 'ABPD';
    addAttendee(timeIn,name,email,id);

    getAttendees('ABPD', function(data){
        res.render('pages/checkin', {
            data:data,
            count:data.length,
            eventName:'Andela Bootcamp Project Defence'
        });
    });
    
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
        eventId:id
    }
    firebase.database().ref('events/'+id).push(attendee);
}
function getAttendees(callback){
    let allAttendees = {};
    const events = firebase.database().ref('events/');
    events.child('ABPD').on('value', function(snapshot){
        console.log(snapshot.val());
        callback(JSON.parse(JSON.stringify(snapshot.val())));
    })
}


function getTime(){
	const currentTime = new Date();
    const hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
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