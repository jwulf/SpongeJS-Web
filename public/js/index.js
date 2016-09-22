var playersConnected = {};

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    updateRightContainer();
    /*setInterval(function () {
        $.ajax({
            url: "/api/players/connected",
            success: updatePlayersConnected,
            dataType: "json"
        })
    }, 500);*/
});

function updateRightContainer() {
    $.ajax({
        url: "/api/session/status",
        success: function (data) {
            if(data.status == "connected")
                updateRightContainerHtml("connected");
            else
                updateRightContainerHtml("login");
        },
        dataType: "json"
    });
}

function updateRightContainerHtml(page){
    $.ajax({
        url: "/html/"+page+".html",
        success: function (data) {
            $("#right-container-content").append($(data));
        }
    });
}

function updatePlayersConnected(players){
    for(var x in players){
        var player = players[x];

        if(playersConnected[player.uuid] == undefined)
            playersConnected[player.uuid] = {location: {}, world: {}};

        playersConnected[player.uuid].name = player.name;
        playersConnected[player.uuid].uuid = player.uuid;
        playersConnected[player.uuid].location.x = player.location.x;
        playersConnected[player.uuid].location.y = player.location.y;
        playersConnected[player.uuid].location.z = player.location.z;
        playersConnected[player.uuid].world.name = player.world.name;
        playersConnected[player.uuid].updated = true;
    }

    for(var uuid in playersConnected){
        var player = playersConnected[uuid];

        if(!player.updated){
            delete playersConnected[uuid];
            $("#player-connected-"+uuid).remove();
        }
        else{
            if($("#player-connected-"+uuid).length == 0)
                $("#players-connected").append($('<div id="'+"player-connected-"+uuid+'" class="col-md-3"> <img class="img-responsive" src="http://avatar.yourminecraftservers.com/avatar/source/minecraft/background/trnsp/bgParams/%23111111,%23cccccc/notFound/steve/figure/face/figureSize/100/borderSize/1/borderColor/%23000000/canvasSize/256/' + player.name + '.png?download" data-toggle="tooltip" data-placement="right" title="' + player.name + '"</div>'));

            player.updated = false;
        }
    }

    $("#players-connected-title").text("Players connected ("+Object.keys(playersConnected).length+")");

    $('[data-toggle="tooltip"]').tooltip();
}