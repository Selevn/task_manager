const passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function(email, password, done)
{
    try
    {
        let result = await require("./users").check_user(email,password);

        if(result)
            return done(null, result);
        else
            return done(null, false);
    }
    catch(e)
    {
        console.log(e);
        return done(null, false);
    }
}));

passport.serializeUser((user, done) =>
{
    console.log("user serialized!");
    done(null, user)
});
passport.deserializeUser((user, done) => {
    console.log("user deserialized!");
    done(null, user)});

module.exports.checkAuth = function (req, res, next){
    req.user?next():res.redirect('/login');
};

module.exports.logout = function(req, res, next){
    req.logout();
    next();
};