var router = require('express').Router();

router.get('/connected', function(req, res, next) {
    try{
        var players = Sponge.getServer().getOnlinePlayers();
        var array = [];

        for(var x in players){
            var player = players[x];
            var world = player.getWorld();
            var location = player.getLocation();

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
    }catch (e){
        console.log(e);
    }

    res.end(JSON.stringify(array));
});

module.exports = router;
