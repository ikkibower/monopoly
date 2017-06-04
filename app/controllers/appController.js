var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
    if (req.user) {
        res.render("signin");
    }
    console.log(req.user);
    res.render("game");

});

// Export routes for server.js to use.
module.exports = router;
