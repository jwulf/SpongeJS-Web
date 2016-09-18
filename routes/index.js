var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var currency = economyService.getDefaultCurrency();

    console.log(currency);

    res.end();
});

router.post('/sendMoney', function(req, res, next) {
    try{
        console.log(economyService.getOrCreateAccount(req.body.user).deposit(economyService.getDefaultCurrency(), req.body.amount, serverCause).getAmount().intValue());
    }catch (e){console.log(e);}
    res.render("index");
});

module.exports = router;
