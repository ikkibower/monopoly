// Global vars
var globalPlayers = [];
var activePlayer = "";
var boardValues = [];
// Snap.svg Setup
var piece;
var s = Snap('#svg');
var die = Snap('#dice-svg');
// s.attr({ viewBox: "0 0 600 900" });
var hat = Snap.select('#hat');

// hat.stop().animate({ transform: 't0,50'}, 200, mina.easeout);
// var board = s.board();
var loop = "M39.148,1387.667l7.018-210.542l0-1130.483h1326v1137.5l8.84,201.047l-0.544-0.021l-187.815-7.525h-942.98L39.148,1387.667z M47.166,47.642v1129.5l-6.982,209.475l209.458-9.974l943.024-0.001l187.293,7.504l-8.792-199.981l-0.001-1136.522H47.166z";
var loopLength = Snap.path.getTotalLength(loop);
// var board = s.image("monopoly.svg", 0, 0, 600, 600);

var board = Snap.load("", function(loadedFragment) {
    s.image("assets/img/monopoly.svg", 0, 0, 600, 600);
    s.image("assets/img/path.svg", 0, 0, 600, 600);
    s.append(loadedFragment);

});

// TESTING PIECE ON BOARD
$('#submit').on('click', function() {
    event.preventDefault();
    $('#hat').show();
    hat.marker(540,540,600,600);
    piece = Snap.load("", function(loadedFragment) {
        s.image("assets/img/car.svg", 540, 540, 50, 50);
        s.append(loadedFragment);
    });
});
// piece.click(function(e) {
//     Snap.animate(0, loopLength,
//         function(step) { //step function
//             console.log('step', step);

//             circleOutline.attr({
//                 path: Snap.path.getSubpath(loop, 0, step)
//             });
//         }, // end of step function
//         800, //duration
//         mina.easeInOut, //easing
//         function() { //callback
//             setTimeout(function() {
//                 circleOutline.attr({
//                     path: Snap.path.getSubpath(loop, 0, 0),
//                     strokeWidth: 0
//                 });
//             }, 1000); //setTimeout
//         } //callback
//     ); //Snap.animate
// }); //click the circle





/*====     Click Handlers     =====
 */
$('#roll').on("click", function() {
    event.preventDefault();
    rollDice();
    // piece.animate({x: 10}, 1000);
    hat.animate({ transform: 't0,50' }, 200, mina.easeout, function() {

    });
});
$('#start').on('click', function(req, res) {
    getPlayer();
    getBoardValue();

});
/*====     Game Functions     =====
 */

// Roll Dice Function
function rollDice(spaces) {
    var dice = [];
    spaces = 0;
    for (i = 0; i < 2; i++) {
        var val = Math.floor(Math.random() * 6) + 1;
        dice.push(val);
        spaces += val;
    }
    Snap.load("", function(loadedFragment) {
        die.image("assets/img/die" + dice[0] + ".svg", 0, 0, 40, 40);
        die.image("assets/img/die" + dice[1] + ".svg", 50, 0, 40, 40);
        die.append(loadedFragment);
    });

    console.log(dice, spaces);
    updateGlobal(spaces);

}

// Call Game Space
function callSpace(num) {
    console.log(num);
    console.log(boardValues[num]);

}
// Sort
function playerSort() {
    globalPlayers.sort(function(a, b) {
        return parseFloat(a.roll) - parseFloat(b.roll);
    });
}

// Choose Playing Order
function playingOrder() {
    $('#start').hide();
    $('#roll').removeClass("hidden");
    event.preventDefault();
    playerSort();
    globalPlayers[0].active_turn = true;
    activePlayer = globalPlayers[0];
    // playerTurn();
    console.log(globalPlayers);
}

// Board position logic
function updateGlobal(spaces) {
    for (i = 0; i < globalPlayers.length; i++) {
        var next = i + 1;
        if (globalPlayers[i].active_turn === true && next < globalPlayers.length) {
            console.log("Your move: " + globalPlayers[i].player_name);
            // Passing 'Go'
            if (globalPlayers[i].current_space + spaces > 39) {
                globalPlayers[i].money += 200;
                globalPlayers[i].current_space = 39 % spaces;
                console.log("L00K  " + globalPlayers[i].current_space);
            } else {
                globalPlayers[i].current_space += spaces;
            }
            // Console Logs
            console.log(boardValues[globalPlayers[i].current_space]);
            console.log("Current Space: " + globalPlayers[i].current_space);
            console.log(globalPlayers[i].player_name, globalPlayers[i].current_space);
            globalPlayers[i].active_turn = false;
            globalPlayers[next].active_turn = true;
            return;
        } else if (globalPlayers[i].active_turn === true && next === globalPlayers.length) {
            console.log("Your move: " + globalPlayers[i].player_name);
            if (globalPlayers[i].current_space + spaces > 39) {
                globalPlayers[i].money += 200;
                globalPlayers[i].current_space = spaces % 39;
            }
            globalPlayers[i].current_space += spaces;
            console.log(boardValues[globalPlayers[i].current_space]);
            console.log(globalPlayers[i].current_space);
            next = 0;
            console.log(globalPlayers[i].player_name,
                globalPlayers[i].current_space);
            globalPlayers[i].active_turn = false;
            globalPlayers[0].active_turn = true;
        }
        console.log(next);
    }
}


$('#roll').on('click', function() {

});

// function purchaseProperty

/*====     API     =====
 */

// Get Board Values API
function getBoardValue(num) {
    $.get('/api/propertys', function(data) {
        boardValues = data;
        console.log(data[num]);
        $('#prop-info').html(`
            <label>TITLE DEEDS</label>
            <p>${data[num].name}</p>
            <br>
            <p>RENT ${data[num].rent}</p>
            <p>Mortgage Value ${data[num].mortgage}</p>
            `);
    });
}

// Get Players API
function getPlayer(data) {
    $.get('/api/players', function(data) {
        globalPlayers = data;
        playingOrder();
        return data;
    });
}

//         if (data[num].type === property) {
//             $('#prop-info').html(`
//                 <label>TITLE DEEDS</label>
//                 <p>${data[num].name}</p>
//                 <br>
//                 <p>RENT ${data[num].rent}</p>
//                 <p>With 1 House   ${data[num].rentOne}</p>
//                 <p>With 2 House   ${data[num].rentTwo}</p>
//                 <p>With 3 House   ${data[num].rentThree}</p>
//                 <p>With 4 House   ${data[num].rentFour}</p>
//                 <p>With HOTEL   ${data[num].rentHotel}</p>
//                 <p>Mortgage Value ${data[num].mortgage}</p>
//             `)
//             if (data[num].owned === false) {
//                 $('#buy-opt').html(`
//                     <label>${date[num].name} is not owned, would you like to purchase property?</label>
//                     <button>I would love to!</button>
//                     <button>Nah, I'm good</button>
//                 `)
//             } else if (data[num].owned = 1) {


//         }

//         } 
//     });
// }

// // <p>Houses cost ${data[num].houseCost} each</p>
// // <p>Hotels, ${data[num].hotels.Cost} plus 4 houses</p>
// >>>>>>> bb248b7a9469e9bf433a79af792e7ff9d8738597
