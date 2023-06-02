const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//used for session cookie

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const customMware = require('./config/middleware');

// app.use(express.urlencoded);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//mongostore is used to store the session cookie in the db
const sessionStore = new MongoStore({
    mongooseConnection: db,
    collection: 'sessions',
    autoRemove: 'disabled',
},
function(err){
    console.log(err || 'connect-mongdb setup ok');
});

app.use(session({
    name: 'bookCricket',
    //TODO: Change the secret before deployment
    secret: 'blahSomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: sessionStore,
}));

app.use(passport.initialize());
app.use(passport.session());





app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);

    }
    console.log(`server is running on port: ${port}`);
});