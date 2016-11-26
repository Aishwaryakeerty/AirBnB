
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//Airbnb required modules
var mysql=require('mysql');
var bcrypt = require('bcryptjs');

var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);

var mongoURL="mongodb://localhost:27017/airbnbv10";
var login=require('./routes/signup');
var room=require('./routes/room');
//Session configuration
app.use(expressSession({  secret: 'Airbnb',
  resave: false,
  //don't save session if unmodified   // don't create session until something stored
  saveUninitialized: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({   url: mongoURL  })
}));
//uncomment below middleware once passport startegy is defined
//app.use(passport.initialize());
//app.use(passport.session());



//
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
//calls to routes for airbnb

app.post('/register',login.register);

//api to get all the room details
app.post('/getRoom',room.getDetails);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
