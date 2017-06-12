// Global vars
var piece;
var globalPlayers = [];
var activePlayer = "";
// Snap.svg Setup
var s = Snap('#svg');
// s.attr({ viewBox: "0 0 600 900" });

// var board = s.board();


// var board = s.image("monopoly.svg", 0, 0, 600, 600);

var board = Snap.load("", function(loadedFragment) {
    s.image("assets/img/monopoly.svg", 0, 0, 600, 600);
    s.image("assets/img/path.svg", 0, 0, 600, 600);
    s.append(loadedFragment);

});

// TESTING PIECE ON BOARD
$('#submit').on('click', function() {
    event.preventDefault();
    piece = Snap.load("", function(loadedFragment) {
        s.image("assets/img/car.svg", 540, 540, 50, 50);
        s.append(loadedFragment);
    });
});
/*====     Click Handlers     =====
 */
$('#roll').on("click", function() {
    event.preventDefault();
    rollDice();
});
$('#start').on('click', function(req, res) {
    getPlayer();

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
        s.image("assets/img/die" + dice[0] + ".svg", 650, 500, 40, 40);
        s.image("assets/img/die" + dice[1] + ".svg", 700, 500, 40, 40);
        s.append(loadedFragment);
    });
    getBoardValue(spaces);
    console.log(dice, spaces);
    updateGlobal(spaces);

}

// Call Game Space
function callSpace(num) {
    console.log(num);
    console.log(boardValues[num]);

}

// Choose Playing Order
function playingOrder() {
    $('#start').hide();
    $('#roll').removeClass("hidden");
    event.preventDefault();
    globalPlayers.sort(function(a, b) {
        return parseFloat(a.roll) - parseFloat(b.roll);
    });
    globalPlayers[0].active_turn = true;
    activePlayer = globalPlayers[0];
    playerTurn();
    console.log(globalPlayers);
}
// Player Turn
function playerTurn() {
    for (i = 0; i < globalPlayers.length; i++) {
        if (globalPlayers[i].active_turn === true) {
            console.log("Your move: " + globalPlayers[i].player_name);
        }
    }
}
// Update globalPlayers object on move
function updateGlobal(spaces) {    
    for (i = 0; i <= globalPlayers.length; i++) {
        var next = i + 1;
        console.log(next);
        console.log(globalPlayers);
        if (globalPlayers[i].active_turn === true && next < globalPlayers.length) {
            globalPlayers[i].current_space += spaces;
            checkBoard(i, spaces);
            globalPlayers[i].active_turn = false;
            globalPlayers[next].active_turn = true;
            return;
         } 
        else if (globalPlayers[i].active_turn === true && next > globalPlayers.length) {
            globalPlayers[i].current_space += spaces;
            checkBoard(i, spaces);
            globalPlayers[i].active_turn = false;
            globalPlayers[0].active_turn = true;
            console.log[boardValues[globalPlayers[i].current_space]];
        }

    }
}
// Check to see if user has passed 'Go'
function checkBoard(i, spaces) {
    if (globalPlayers[i].space + spaces > 39) {
        globalPlayers[i].money += 200;
        globalPlayers[i].current_space = 0;
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
