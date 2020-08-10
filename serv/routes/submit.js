var express = require("express");
var passport = require("passport");
// var List = require("../listModel");
var User = require("../userModel");
var db_helper = require("../db_helper");
var router = express.Router();

// router.put("/", passport.authenticate('jwt'), function(req,res,next) {
//     const list = JSON.parse(req.body.list);
//     console.log(list);
//     res.send(list);
// });

router.put("/", (req,res,next) => {
    passport.authenticate('jwt', async (err,user) => {
        const id = user._id;
        const list = req.body;
        if (err)
            next(err);
        else {
            try {
                await User.findOne({
                    _id: user.userID
                }).then(db_helper.putList(list))
                .catch(error => next(error));
            }
            catch(error) {
                res.status(500);
                console.log(error);
            }
            
            res.send(list);
        }
    })(req,res,next);

});

module.exports = router;