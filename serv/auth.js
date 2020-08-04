const passport = require("passport"), localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("./model");

passport.use("register", new localStrategy(async(username, password, done) => {
    try {
        const user = await User.create({username,password});
        console.log("[auth.js/register]");
        console.log(user);
        return done(null,user);
    } catch (error) {
        done(error);
    }
}));

passport.use("login", new localStrategy(async (username,password, done) => {
    try {
        const user = await User.findOne({username});
        if (!user) {
            console.log("[auth.js/login::userNotFound]");
            return done(null, false, {message: "User not found"});
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
            console.log("[auth.js/login::incorrectPassword]");
            return done(null, false, {message: "Wrong Password"});
        }
        console.log("[auth.js/login::successful]");
        console.log("successful login");
        return done(null, user, {message: "Logged in Successfully"});
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));