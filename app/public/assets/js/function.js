// Global vars

var piece;
var globalPlayers;
var boardValues = [];
var snapPieces = [];
var activePlayer = "";

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
    hat.marker(540, 540, 600, 600);
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
});
$('#start').on('click', function(req, res) {
    event.preventDefault();
    getPlayer();
    getBoard();
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

}
// Move Piece
function movePiece(id) {
    hat.animate({ transform: 't0,50' }, 200, mina.easeout, function() {

    });
}

// Update globalPlayers object on move
function updateGlobal(spaces) {
    for (i = 0; i < globalPlayers.length + 1; i++) {
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
            movePiece(globalPlayers[i]);
            // Get Board Value
            getBoardValue(i, globalPlayers[i].current_space);
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
            } else {
                globalPlayers[i].current_space += spaces;
            }
            movePiece();
            // Get Board Value
            getBoardValue(i, globalPlayers[i].current_space);
            console.log(boardValues[globalPlayers[i].current_space]);
            console.log(globalPlayers[i].current_space);
            next = 0;
            console.log(globalPlayers[i].player_name);
            console.log("Current Space: " + globalPlayers[i].current_space);
            globalPlayers[i].active_turn = false;
            globalPlayers[0].active_turn = true;
            return;
        }
        console.log(next);
        console.log(globalPlayers);
    }
}


function getBoardValue(player, num) {
    if (boardValues[num].type === 'Property') {
        console.log(globalPlayers[player]);
        $('#prop-info').html(`
                <label>TITLE DEEDS</label>
                <p>${boardValues[num].name}</p>
                <br>
                <p>RENT ${boardValues[num].rent}</p>
                <p>With 1 House   ${boardValues[num].rentOne}</p>
                <p>With 2 House   ${boardValues[num].rentTwo}</p>
                <p>With 3 House   ${boardValues[num].rentThree}</p>
                <p>With 4 House   ${boardValues[num].rentFour}</p>
                <p>With HOTEL   ${boardValues[num].rentHotel}</p>
                <p>Mortgage Value ${boardValues[num].mortgage}</p>
            `);
        if (boardValues[num].isOwned === false) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is not owned, would you like to purchase property?</label>
                    <button class='btn btn-default' id='buy-prop'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
            $('#buy-prop').on('click', function() {
                globalPlayers[player].money -= boardValues[num].price;
            });

        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    `);
        } else if (boardValues[num].isMortgaged === true) {
            $('#buy-opt').html(`
                    <label>
                    `);
        }
    } else if (boardValues[num].type === 'RR') {
        $('#prop-info').html(`
                <p>${boardValues[num].name}</p>
                <p>Rent                  ${boardValues[num].rent}</p>
                <p>If 2 R.R.'s are owned ${boardValues[num].rentOne}</p>
                <p>If 3 R.R.'s are owned ${boardValues[num].rentTwo}</p>
                <p>If 4 R.R.'s are owned ${boardValues[num].rentThree}</p>
                <br>
                <p>Mortgage Value        ${boardValues[num].mortgage}</p>
                `);
        if (boardValues[num].isOwned === false) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is not owned, would you like to purchase property?</label>
                    <button class='btn btn-default'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    `);
        }
    } else if (boardValues[num].type === 'Tax') {
        $('#prop-info').html(`
                <p>${boardValues[num].name}</p>
                <p>  If one "Utility" is owned</p>
                <p>rent is 4 times amount shown</p>
                <p>on dice.</p>
                <p>  If both "Utilities" are owned</p>
                <p>rent is 10 times amount shown</p>
                <p>on dice.</p>
                <br>
                <p>Mortgage Value        ${boardValues[num].mortgage}</p>
                `);
        if (boardValues[num].isOwned === false) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is not owned, would you like to purchase property?</label>
                    <button class='btn btn-default'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    `);
        }
    } else if (boardValues[num].id === 4) {
        $('#prop-info').html(`
                <p>${boardValues[num].name}</p>
                <br>
                <p>Pay 10%</p>
                <p>   or   </p>
                <p>$200</p>
                `);
        $('#buy-opt').html(`
                <button class='btn btn-default'>Pay 10%</button>
                <button class='btn btn-default'>Pay $200</button>
                `);
    } else if (boardValues[num].id === 38) {
        $('#prop-info').html(`
                <p>LUXURY TAX</p>
                <br>
                <p>PAY $75.00</p>    
                `);
    } else if (boardValues[num].type === 'Chance') {
        $('#prop-info').html(`
                <p>CHANCE</p>    
                `);
    } else if (boardValues[num].type === 'Chest') {
        $('#prop-info').html(`
                <p>COMMUNITY CHEST</p>
                `);
    } else if (boardValues[num].type === 'Go') {
        $('#prop-info').html(`
                <p>COLLECT</p>
                <p>$200.00 SALARY</p>
                <p>AS YOU PASS</p>
                `);
    }

}
/*====     API     =====
 */
// Get Players API
function getPlayer(data) {
    $.get('/api/players', function(data) {
        data.sort(function(a, b) {
            return parseFloat(a.roll) - parseFloat(b.roll);
        });
        globalPlayers = data;
        playingOrder();
        // Appending values
        globalPlayers.forEach(function(element, index, globalPlayers) {
            var playerPiece = "#" + element.piece;
            console.log(playerPiece);
            console.log(element);
            // Append Snap.svg piece as string
            element[element.piece] = "Snap.select(" + playerPiece + ")";
            // Push to global snap pieces
            snapPieces.push(element[element.piece]);
            $(playerPiece).show();
        });
        console.log(snapPieces);
        return data;

    });
}
// Get Board Values API
function getBoard(data) {
    $.get('/api/propertys', function(data) {
        boardValues = data;
        console.log(boardValues);
    });
}
