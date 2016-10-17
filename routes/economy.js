var conditional = require("conditional");
var router = require('express').Router();

router.get('/currency', function(req, res, next) {
    res.end(JSON.stringify(economyService.getDefaultCurrency()));
});

router.get('/balance', function(req, res, next) {
    try{
        conditional.checkDefined(req.session.uuid, "not connected.");

        res.end(JSON.stringify({balance: economyService.getOrCreateAccount(req.session.uuid).getBalance(economyService.getDefaultCurrency())}));
    } catch (e){
        console.log(e);
    }
});

module.exports = router;
