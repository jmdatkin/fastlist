var express = requre("express");
var passport = require("passport");
var db_helper = require("../db_helper");
var router = express.Router();

router.get("/", passport.authenticate('jwt'), function(req,res,next) {
    const list = req.body.list;
    res.send(list);
});