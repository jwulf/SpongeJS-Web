var playersOnline = {};
var playersOnlineListeners = [];
var loginLastUUIDCodeSend = "";

$(document).ready(function() {
    initLoginButton();
    initPlayersOnlineInterval();
});

function initPlayersOnlineInterval() {
    playersOnlineListeners.push(playersConnectedListeners());
    playersOnlineListeners.push(loginPlayersConnectedListeners());

    setInterval(function () {
        $.ajax({
            url: "/api/players/connected",
            success: updatePlayersOnline,
            dataType: "json"
        });
    }, 1000);
}

function initLoginButton(){
    $('#button-send-login-code').click(function () {
        $.ajax({
            url: "/api/login/checkCode?uuid="+loginLastUUIDCodeSend+"&code="+$('#input-send-login-code').val(),
            success: function (data) {
                console.log(data);
                console.log(data.status);
                if(data.status == "connected")
                    removeLoginPanel();
            },
            dataType: "json"
        });
    });
}

function removeLoginPanel(){
    $('#login-panel').fadeTo(500, 0);
    setTimeout(function () {
        $('#login-panel').remove();
    }, 100);
}

function loginPlayersConnectedListeners() {
    return {
        onPlayerConnected: function (player) {
            $("#login-players-connected").append('<li id="login-player-connected-'+player.uuid+'" ><a href="#">'+player.name+'</a></li>');
            $('#login-player-connected-'+player.uuid+" > a").click(function () {
                loginLastUUIDCodeSend = player.uuid;
                $.ajax({
                    url: "/api/login/sendCode?uuid="+player.uuid
                });
            });
        },
        onPlayerDisconnected: function (uuid) {
            $('#login-player-connected-'+uuid+'').remove();
        },
        onPlayerUpdate: function (player) {}
    }
}

function playersConnectedListeners(){
    return {
        onPlayerConnected: function (player) {
            $("#players-connected").append($('<div id="'+"player-connected-"+player.uuid+'" class="col-md-3"> <img class="img-responsive playerHead" src="http://avatar.yourminecraftservers.com/avatar/source/minecraft/background/trnsp/bgParams/%23111111,%23cccccc/notFound/steve/figure/face/figureSize/100/borderSize/1/borderColor/%23000000/canvasSize/256/' + player.name + '.png?download" data-toggle="tooltip" data-placement="bottom" title="' + player.name + '"></div>'));
            $('[data-toggle="tooltip"]').tooltip();
            $("#players-connected-title").text("Players connected ("+Object.keys(playersOnline).length+")");
        },
        onPlayerDisconnected: function (uuid) {
            $("#player-connected-"+uuid).remove();
            $("#players-connected-title").text("Players connected ("+Object.keys(playersOnline).length+")");
        },
        onPlayerUpdate: function (player) {}
    }
}

function updatePlayersOnline(players){
    for(var x in players){
        var player = players[x];
        var connected = false;

        if(playersOnline[player.uuid] == undefined) {
            connected = true;
            playersOnline[player.uuid] = {location: {}, world: {}};
        }

        playersOnline[player.uuid].name = player.name;
        playersOnline[player.uuid].uuid = player.uuid;
        playersOnline[player.uuid].location.x = player.location.x;
        playersOnline[player.uuid].location.y = player.location.y;
        playersOnline[player.uuid].location.z = player.location.z;
        playersOnline[player.uuid].world.name = player.world.name;
        playersOnline[player.uuid].updated = true;


        if(connected)
            for(var x in playersOnlineListeners)
                playersOnlineListeners[x].onPlayerConnected(playersOnline[player.uuid]);
    }

    for(var uuid in playersOnline){
        var player = playersOnline[uuid];

        if(!player.updated){
            delete playersOnline[uuid];

            for(var x in playersOnlineListeners)
                playersOnlineListeners[x].onPlayerDisconnected(uuid);
        }
        else{
            for(var x in playersOnlineListeners)
                playersOnlineListeners[x].onPlayerUpdate(player);

            player.updated = false;
        }
    }
}