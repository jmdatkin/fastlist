var express = require("express");
var passport = require("passport");
var db_helper = require("../db_helper");
var router = express.Router();

router.get("/", (req,res,next) => {
    passport.authenticate('jwt', async (err,user) => {
        if (err) {
            res.status(401);
            next(err);
        }
        console.log("[userlists.js]");
        console.log(user);
        await db_helper.getAllListsFromUser(user.user._id, (data) => {
            console.log("[userlists.js::.callback()]");
            console.log(data);
            res.status(200);
            res.send(data);
        })
        .catch(error => next(error));
    })(req,res,next);
});

module.exports = router;