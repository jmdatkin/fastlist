var express = require("express");
var passport = require('passport');
var router = express.Router();

router.post("/", passport.authenticate("register", {session: false}), async (req, res, next) => {
    console.log("[register.js]");
    console.log(req);
    res.json({
        message: "Signup successful",
        user: req.user
    });
});

// router.get("/", function(req,res,next) {
//     var username = req.query.username;
//     var pwd = req.query.pwd;
//     if (db_helper.createUser(username,pwd))
//         res.send("Successfully created user!");
// });

module.exports = router;