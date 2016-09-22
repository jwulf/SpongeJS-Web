var router = require('express').Router();

router.get('/status', function(req, res, next) {
    if(req.session.isConnected == true)
        res.end(JSON.stringify({status: "connected"}));
    else
        res.end(JSON.stringify({status: "not_connected"}));
});

module.exports = router;
