var express = require("express");
var passport = require('passport');
var router = express.Router();

router.post("/", (req,res,next) => {
    passport.authenticate("register", {session: false}, async (err, user, info) => {
        if (err) {
            res.status(500);
            console.log(err);
        }
        if (!user) {
            res.status(500);
            res.send("Could not create user");
        }
        else {
            console.log("[register.js]");
        // console.log(req);
            console.log(user);
            res.send("Signup successful");
        }
    })(req,res,next);
});

// router.post("/", passport.authenticate("register", {session: false},), async (req, res, next) => {
//     // console.log("[register.js]");
//     // console.log(req);
//     console.log(req);
//     res.json({
//         message: "Signup successful",
//         user: req.user
//     });
// });

module.exports = router;