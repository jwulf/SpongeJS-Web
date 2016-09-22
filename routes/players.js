var router = require('express').Router();

router.get('/connected', function(req, res, next) {
    var players = Sponge.getServer().getOnlinePlayers();
    var array = [];

    for(var x in players){
        var player = players[x];
        var location = player.getLocation();
        var world = player.getWorld();

        array.push({
            name: player.getName(),
            uuid: player.getUniqueId(),
            location: {
                x: location.getX(),
                y: location.getY(),
                z: location.getZ()
            },
            world: {
                name: world.getName()
            }
        });
    }

    res.end(JSON.stringify(array));
});

module.exports = router;
