var express = require("express");
const jwt = require('jsonwebtoken');
const passport = require("passport");
var router = express.Router();

router.post("/", (req,res,next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err) {
                const error = new Error("An error occurred");
                return next(error);
            }
            //Send back message specific to problem
            else if (!user) {
                res.status(403);
                res.end(info.message);//next(error);
                return;
            }
            //If authentication successful
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);
                //Prepare info to send to client
                const body = { _id: user._id, username: user.username};
                const token = jwt.sign({user: body}, 'e4344fdf28faf48aac35dc94aa0227fa', {expiresIn: '1d'});
                console.log("[login.js::23]");
                console.log(body);
                res.cookie('token',token,{httpOnly:true, sameSite: 'strict', secure: true});
                return res.json({user: body});
            });
        } catch (error) {
            return res.json(error);//next(error);
        }
    })(req,res,next);
    // res.send(req.user);
});

module.exports = router;