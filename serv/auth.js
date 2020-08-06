const passport = require("passport"), localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("./userModel");

passport.use("register", new localStrategy(async(username, password, done) => {
    // if (User.findOne({username}))
    //     return done(null,false,{message: "A user with this username already exists!"});
    var userRegexp = /^[a-zA-Z0-9]{4,12}$/;
    var passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    if (!userRegexp.test(username) || !passRegexp.test(password))
        return done(null,false,{message:"Username or password does not meet criteria"});
    try {
        const user = await User.create({username,password});
        return done(null,user);
    } catch (error) {
        done(error, {message:'A user with that name already exists'});
    }
}));

passport.use("login", new localStrategy(async (username,password, done) => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            console.log("[auth.js/login::userNotFound]");
            return done(null, false, {message: "User not found!"});
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
            console.log("[auth.js/login::incorrectPassword]");
            return done(null, false, {message: "Incorrect password!"});
        }
        console.log("[auth.js/login::successful]");
        console.log("successful login");
        return done(null, user, {message: "Logged in successfully!"});
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: 'e4344fdf28faf48aac35dc94aa0227fa',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    console.log("tokennnnn");
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));