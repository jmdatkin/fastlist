const passport = require("passport"), localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("./userModel");

passport.use("register", new localStrategy(async (username, password, done) => {
    
    // if (User.findOne({username}))
    //     return done(null,false,{message: "A user with this username already exists!"});
    var userRegexp = /^[a-zA-Z0-9]{4,12}$/;
    var passRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
    if (!userRegexp.test(username) || !passRegexp.test(password))
        return done(null,false,{message:"Username or password does not meet criteria"});
    try {
        console.log("[auth.js/register]");
        console.log(`username: ${username}, password: ${password}`);
        const user = await User.create({username,password})
        // .next((user) => {
            console.log("[auth.js/register:19]");
            console.log(user);
            return done(null,user);//});
        // .catch(error => console.log(error));
    } catch (error) {
        done(error, {message:'A user with that name already exists'});
    }
}));

passport.use("login", new localStrategy(async (username,password, done) => {
    try {
        const userSearchedFor = await User.findOne({username});
        if (!userSearchedFor) {
            console.log("[auth.js/login::userNotFound]");
            return done(null, false, {message: "User not found!"});
        }

        const validate = await userSearchedFor.isValidPassword(password);
        if (!validate) {
            console.log("[auth.js/login::incorrectPassword]");
            return done(null, false, {message: "Incorrect password!"});
        }
        console.log("[auth.js/login::successful]");
        console.log("successful login");
        console.log(userSearchedFor);
        return done(null, userSearchedFor, {message: "Logged in successfully!"});
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy(
    {
        secretOrKey: 'e4344fdf28faf48aac35dc94aa0227fa',
        jwtFromRequest: (req) => req.cookies.token
    }, async (jwt_payload, done) => {
        console.log(jwt_payload);
        try {
            return done(null, jwt_payload); //passed in as user
        } catch (error) {
            console.log(error);
            done(error);
    }
}));