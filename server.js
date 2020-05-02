global.public_path = __dirname+'\\public\\';

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');


app.set("view engine", "hbs");
app.set('views', __dirname + '/views');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "RETTAH_DAM",
    resave: true,
    cookie: {maxAge: 1000*60*15},
    httpOnly: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


require("./models/auth");

app.use("/login",require("./routers/login_router"));
app.use("/",require("./routers/home_router"));
app.get('/*', function(req, res){
    res.status(404);
    res.redirect('/login');
    });
app.listen(require("./settings").port,require("./settings").host, function () {
    console.log('App server listening on '+require("./settings").host+':'+require("./settings").port);
});