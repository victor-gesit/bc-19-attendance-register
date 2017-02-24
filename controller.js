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
let counter = 0;

module.exports = function(app){
    app.get('/',function(req,res){
        res.render('pages/signin');
    });
    app.get('/checkin', function(req,res){
        getAttendees('ABPD',function(data){
            //console.log('from get(): ' + data);

            let at = [];
            let keys = Object.keys(data);
            //console.log(keys);
            for(key in keys){
                //console.log(keys[key]);
                at.push(data[keys[key]]);
            }
            //console.log(at);
            counter = at.length;
            const obj = {
                count:at.length,
                eventName:'Andela  Bootcamp Project Presentation',
                data:at,
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
        signedIn(function(signedin){
            if(!signedin){
                res.render('pages/signin');
            }
            else{
                res.render('pages/dashboard');
            }
        })
        console.log('dadad');
        //res.render('pages/dashboard');
    })
    app.get('/create', function(req,res){
        res.render('pages/create')
    })
    app.get('/signup', function(req,res){
        res.render('pages/signup')
    })
    app.get('/signout', function(req,res){
        signOut(req,res);
    })

    
    // Post Methods
    app.post('/checkin', function(req,res){
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
    app.post('/signup',function(req,res){
        signup(req,res);
    })
}

function home(req,res){
    checkIn(req,res);
}
function checkIn(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const timeIn = getTime();
    const eventCode = 'ABPD';
    counter +=1;
    let id = counter;
    addAttendee(res, timeIn,name,email,id,eventCode);
    getAttendees(eventCode, function(data){
        res.render('pages/checkin', {
            data:data,
            count:data.length,
            eventName:'Andela Bootcamp Project Defence'
        });
    });
    res.redirect('/checkin');    
}

function signin(req,res){
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user) => {res.redirect('/dashboard')})
        .catch(function(error){
            let errorcode = error.code;
            let erroMessage = error.message;
            if(errorcode == 'auth/wrong-password'){
                console.log('Wrong PW');
            } else{
                console.log(error.message);
            }
            //console.log('WRONG');
            res.redirect('/signin');
        })
}

function signup(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const eventCode = req.body.eventCode;
    const descr = req.body.eventDesc

    console.log('SIGNUP CALLED');
    firebase.auth().createUserWithEmailAndPassword(email, password)
        /*.then((user) => {
            let userId = user.uid;
            let userRef = database.child('users/' + userId);
            
            return userRef.set({
                userId,
                full_name,
                email,
                password
            });
        })*/
        .then(


            res.redirect('/dashboard')

        )
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
    });
}
function addAttendee(res,timeIn, name, email, attID, eventCode){
    const attendee = {
        timeIn:timeIn,
        name:name,
        email:email,
        id:attID,
        eventCode:eventCode
    }
    database.ref('events/'+eventCode+'/').push(attendee);
}
function getAttendees(eventCode, callback){
    let allAttendees = {};
    const events = database.ref('events/'+eventCode);
    events.once('value').then(function(snapshot){
        if(snapshot===undefined){
            callback({});
        }
        callback(snapshot.val());
    })
}


function getTime(){
	const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = '0' + minutes;
    }
    if (seconds < 10){
        seconds = '0' + seconds;
    }
    if(hours < 10){
        hours = '0' + hours;
    }
    let time = hours + ':' + minutes +' ';
    if(hours > 11){
        time+='PM';
    } else {
        time+='AM'
    }
    return time;
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

function addEvent(req,res){

}

function getEvents(email,callback){
    let allAttendees = {};
    const events = database.ref('users'+email);
    events.once('value').then(function(snapshot){
        if(snapshot===undefined){
            callback({});
        }
        callback(snapshot.val());
    })

}
function addEvents(req,res){

}

function signOut(req,res){
    firebase.auth().signOut()
    .then(function() {
        res.redirect('/signin');
  // Sign-out successful.
        }, function(error) {
  // An error happened.
    });
}

function signedIn(callback){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        callback(true);
    } else {
        callback(false);
    }
});
}