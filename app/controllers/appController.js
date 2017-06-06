var express = require("express");

var router = express.Router();

var db = require("../models");

router.get("/", function(req, res) {
    if (req.user) {
        res.render("signin");
    }
    console.log(req.user);
    res.render("game");
    
});
// Get Board Values
router.get("/api/propertys", function(req,res){
	db.Property.findAll({}).then(function(values){
		res.json(values);
	});
});
// Export routes for server.js to use.
module.exports = router;
