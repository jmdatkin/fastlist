var express = requre("express");
var passport = require("passport");
var db_helper = require("../db_helper");
var router = express.Router();

router.get("/", passport.authenticate('jwt'), function(req,res) {
    const list = db_helper.getList(req.query.id);
    res.send(list);
});