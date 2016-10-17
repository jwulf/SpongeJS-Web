var conditional = require("conditional");
var router = require('express').Router();

router.get('/sendCode', function(req, res, next) {
    conditional.checkDefined(req.query.uuid, "uuid not defined.");
    var player = Sponge.getServer().getPlayer(req.query.uuid);

    if(req.session.connected != true && player != null){
        var code = parseInt(Math.random()*10000)+"";

        req.session.loginCode = code;

        player.sendMessage("SpongeJS login code: "+code);
    }

    res.end();
});

router.get('/checkCode', function(req, res, next) {
    conditional.checkDefined(req.query.code, "code not defined.");
    conditional.checkDefined(req.query.uuid, "uuid not defined.");

    if(req.session.loginCode == req.query.code) {
        req.session.connected = true;
        req.session.uuid = req.query.uuid;
        res.end(JSON.stringify({status: "connected"}));
    }
    else {
        req.session.loginCode = undefined;
        res.end(JSON.stringify({status: "not_connected"}));
    }
});

module.exports = router;
