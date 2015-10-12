var socket = io();
var id;
var emoji;

var emitCount = 0;

var emojis = ["&#x1F601;","&#x1F602;","&#x1F603;","&#x1F604;","&#x1F605;","&#x1F606;","&#x1F609;","&#x1F60A;","&#x1F60B;","&#x1F60C;","&#x1F60D;","&#x1F60F;","&#x1F612;","&#x1F613;","&#x1F614;","&#x1F616;","&#x1F618;","&#x1F61A;","&#x1F61C;","&#x1F61D;","&#x1F61E;","&#x1F620;","&#x1F621;","&#x1F622;","&#x1F623;","&#x1F624;","&#x1F625;","&#x1F628;","&#x1F629;","&#x1F62A;","&#x1F62B;","&#x1F62D;","&#x1F630;","&#x1F631;","&#x1F632;","&#x1F633;","&#x1F635;","&#x1F637;","&#x1F638;","&#x1F639;","&#x1F63A;","&#x1F63B;","&#x1F63C;","&#x1F63D;","&#x1F63E;","&#x1F63F;","&#x1F640;","&#x1F645;","&#x1F646;","&#x1F647;","&#x1F648;","&#x1F649;","&#x1F64A;","&#x1F64B;","&#x1F64C;","&#x1F64D;","&#x1F64E;","&#x1F64F;","&#x1F600;","&#x1F607;","&#x1F608;","&#x1F60E;","&#x1F610;","&#x1F611;","&#x1F615;","&#x1F617;","&#x1F619;","&#x1F61B;","&#x1F61F;","&#x1F626;","&#x1F627;","&#x1F62C;","&#x1F62E;","&#x1F62F;","&#x1F634;","&#x1F636;","&#x1F40C;","&#x1F40D;","&#x1F40E;","&#x1F411;","&#x1F412;","&#x1F414;","&#x1F417;","&#x1F418;","&#x1F419;","&#x1F41A;","&#x1F41B;","&#x1F41C;","&#x1F41D;","&#x1F41E;","&#x1F41F;","&#x1F420;","&#x1F421;","&#x1F422;","&#x1F423;","&#x1F424;","&#x1F425;","&#x1F426;","&#x1F427;","&#x1F428;","&#x1F429;","&#x1F42B;","&#x1F42C;","&#x1F42D;","&#x1F42E;","&#x1F42F;","&#x1F430;","&#x1F431;","&#x1F432;","&#x1F433;","&#x1F434;","&#x1F435;","&#x1F436;","&#x1F437;","&#x1F438;","&#x1F439;","&#x1F43A;","&#x1F43B;","&#x1F43C;","&#x1F43D;","&#x1F43E;","&#x1F440;","&#x1F442;","&#x1F443;","&#x1F444;","&#x1F445;","&#x1F446;","&#x1F447;","&#x1F448;","&#x1F449;","&#x1F44A;","&#x1F44B;","&#x1F44C;","&#x1F44D;","&#x1F44E;","&#x1F44F;","&#x1F450;","&#x1F451;","&#x1F452;","&#x1F453;","&#x1F454;","&#x1F455;","&#x1F456;","&#x1F457;","&#x1F458;","&#x1F459;","&#x1F45A;","&#x1F45B;","&#x1F45C;","&#x1F45D;","&#x1F45E;","&#x1F45F;","&#x1F460;","&#x1F461;","&#x1F462;","&#x1F463;","&#x1F464;","&#x1F466;","&#x1F467;","&#x1F468;","&#x1F469;","&#x1F46A;","&#x1F46B;","&#x1F46E;","&#x1F46F;","&#x1F470;","&#x1F471;","&#x1F472;","&#x1F473;","&#x1F474;","&#x1F475;","&#x1F476;","&#x1F477;","&#x1F478;","&#x1F479;","&#x1F47A;","&#x1F47B;","&#x1F47C;","&#x1F47D;","&#x1F47E;","&#x1F47F;","&#x1F480;","&#x1F481;","&#x1F482;","&#x1F483;","&#x1F484;","&#x1F485;","&#x1F486;","&#x1F487;","&#x1F488;","&#x1F489;","&#x1F48A;","&#x1F48B;","&#x1F48C;","&#x1F48D;","&#x1F48E;","&#x1F48F;","&#x1F490;","&#x1F491;","&#x1F492;","&#x1F493;","&#x1F494;","&#x1F495;","&#x1F496;","&#x1F497;","&#x1F498;","&#x1F499;","&#x1F49A;","&#x1F49B;","&#x1F49C;","&#x1F49D;","&#x1F49E;","&#x1F49F;","&#x1F4A0;","&#x1F4A1;","&#x1F4A2;","&#x1F4A3;","&#x1F4A4;","&#x1F4A5;","&#x1F4A6;","&#x1F4A7;","&#x1F4A8;","&#x1F4A9;","&#x1F4AA;","&#x1F4AB;","&#x1F4AC;","&#x1F4AE;","&#x1F4AF;","&#x1F4B0;","&#x1F4B1;","&#x1F4B2;","&#x1F4B3;","&#x1F4B4;","&#x1F4B5;","&#x1F4B8;","&#x1F302;","&#x1F303;","&#x1F304;","&#x1F305;","&#x1F306;","&#x1F307;","&#x1F308;","&#x1F309;","&#x1F30A;","&#x1F30B;","&#x1F30C;","&#x1F30F;","&#x1F311;","&#x1F313;","&#x1F314;","&#x1F315;","&#x1F319;","&#x1F31B;","&#x1F31F;","&#x1F320;","&#x1F330;","&#x1F331;","&#x1F334;","&#x1F335;","&#x1F337;","&#x1F338;","&#x1F339;","&#x1F33A;","&#x1F33B;","&#x1F33C;","&#x1F33D;","&#x1F33E;","&#x1F33F;","&#x1F340;","&#x1F341;","&#x1F342;","&#x1F343;","&#x1F344;","&#x1F345;","&#x1F346;","&#x1F347;","&#x1F348;","&#x1F349;","&#x1F34A;","&#x1F34C;","&#x1F34D;","&#x1F34E;","&#x1F34F;","&#x1F351;","&#x1F352;","&#x1F353;","&#x1F354;","&#x1F355;","&#x1F356;","&#x1F357;","&#x1F358;","&#x1F359;","&#x1F35A;","&#x1F35B;","&#x1F35C;","&#x1F35D;","&#x1F35E;","&#x1F35F;","&#x1F360;","&#x1F361;","&#x1F362;","&#x1F363;","&#x1F364;","&#x1F365;","&#x1F366;","&#x1F367;","&#x1F368;","&#x1F369;","&#x1F36A;","&#x1F36B;","&#x1F36C;","&#x1F36D;","&#x1F36E;","&#x1F36F;","&#x1F370;","&#x1F371;","&#x1F372;","&#x1F373;","&#x1F374;","&#x1F375;","&#x1F376;","&#x1F377;","&#x1F378;","&#x1F379;","&#x1F37A;","&#x1F37B;","&#x1F380;","&#x1F381;","&#x1F382;","&#x1F383;","&#x1F384;","&#x1F385;","&#x1F386;","&#x1F387;","&#x1F388;"];

$(document).on("ready", function() {
    // Generate the emoji picker
  var emojiPicker = $("#emoji-picker");
  for (var i in emojis) {
    emojiPicker.append(jQuery("<option>", {value : emojis[i]}).html(emojis[i]));
  }

  bindListeners();
});

function bindListeners() {
  $("#emoji-picker").on("change", function(e) {
    emoji = $(this).val();
  });
}

document.onmousemove=function(e){
    if (!id || !emoji) { return; }
    var x = e.clientX;
    var y = e.clientY;
    var mouse = {
        x: x - 5, 
        y: y - 5, 
        uid: id,
        emoji: emoji
    }

    if ((emitCount = (emitCount + 1) % 10) == 0 )
        socket.emit('move', mouse);
    moveMouse(mouse);
}

document.addEventListener("touchmove", function(e){
    e.preventDefault();
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    var mouse = {
        x: x, 
        y: y, 
        uid: id,
        emoji: emoji
    }
    if ((emitCount = (emitCount + 1) % 10) == 0)
        socket.emit('move', mouse);
    moveMouse(mouse);
}, false);

socket.on('move', function(mouse){
    if (mouse.uid !== id) {
      moveMouse(mouse);
    }
});

window.onload=function(){
    id = guidGenerator();
    emoji = randEmoji();
}

// position cursors
function moveMouse(mouse){
    var node = document.getElementById('mouse' + mouse.uid);
    if (!node){
        node = createMouse(mouse);
    }
    node.style.left = mouse.x + 'px';
    node.style.top = mouse.y +  'px';
    node.innerHTML = mouse.emoji;
}

function createMouse(mouse){
    var node = document.createElement('div');
    node.setAttribute('class', 'mouse');
    node.setAttribute('id', 'mouse'+mouse.uid);
    if (mouse.uid == id){ node.classList.add('me') }
    node.innerHTML = mouse.emoji;
    document.getElementById('bohx').appendChild(node);
    return node;
}

// helpers
function randEmoji(){
    return emojis[Math.floor(Math.random()*emojis.length)];
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}