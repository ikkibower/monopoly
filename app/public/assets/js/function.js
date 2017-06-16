// Global vars

var piece;
var globalPlayers;
var boardValues = [];
var snapPieces = [];
var activePlayer = "";


// Snap.svg Setup
var s = Snap('#svg'),
    boardSet = Snap.set(s),
    pieceSet = Snap.set();
var die = Snap('#dice-svg');
// s.attr({ viewBox: "0 0 600 900" });

// var board = s.image("monopoly.svg", 0, 0, 600, 600);
var board = Snap.load("", function(loadedFragment) {
    s.image("assets/img/monopoly.svg", 0, 0, 600, 600);
    s.image("assets/img/path.svg", 0, 0, 600, 600);
    s.append(loadedFragment);
    var loop = s.path("M 20 18 L 575 18 L 575 580 L 20 580  Z").attr({ fill: "none", stroke: "red", opacity: "1" });

    var rect = s.rect(60, 0, 20, 20).attr({ fill: 'blue', opacity: 0 });
    var rect2 = rect.clone();

    // hat.transform('t625,-150');
    //     var t = new Snap.Matrix()
    // t.translate(100, 100);
    // hat.transform(t); 
    // function drawRect(el) {
    //     el.drawAtPath(loop, 7000, { callback: drawRect.bind(null, el) });
    // }

    // for (var x = 0; x < 1; x++) {
    //     setTimeout(function() { drawRect(hat.clone().attr({ opacity: 1 })) }, x * 1000);
    // }

    // var loopLength = Snap.path.getTotalLength(loop);
});




// TESTING PIECE ON BOARD
$('#submit').on('click', function() {
    event.preventDefault();

});





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
    piece = Snap.load("", function(loadedFragment) {
        // Creating group <g>
        g = s.g();
        for (var i = 0; i < globalPlayers.length; i++) {
            var img = s.image(`assets/img/${globalPlayers[i].piece}.svg`, 545, 545, 50, 50);
            img.attr({
                id: `snap-${globalPlayers[i].piece}`
            });
            snapPieces.push(img);
            g.add(img);
            s.select(`snap-${globalPlayers[i].piece}`);
            snapPieces[i].transform('t0,-300');
        }

        s.append(loadedFragment);
        console.log(s);
        console.log(snapPieces);
        promptPlayer();
    });
});
/*====     Game Functions     =====
 */
// Roll Dice Function
function rollDice(spaces) {
    $('#roll').hide();
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
    // event.preventDefault();
    playerSort();
    globalPlayers[0].active_turn = true;
    activePlayer = globalPlayers[0];

}
// Move Piece
function movePiece(id) {
    hat.animate({ transform: 't100,50' }, 2000, mina.easeout, function() {

    });
}

// Update globalPlayers object on move
function updateGlobal(spaces) {
    for (i = 0; i < globalPlayers.length+1; i++) {
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
/* PROMPT PLAYER
 */
function promptPlayer() {
    $('#buy-opt').hide();
    $('#roll').show();
    for (i = 0; i < globalPlayers.length; i++) {
        if (globalPlayers[i].active_turn === true) {
            $('#prop-info').html(`
                <h3>Your Move ${globalPlayers[i].player_name}                
                `);

        }
    }
}

/* GET BOARD VALUES
 */
function getBoardValue(player, num) {
    $("#buy-opt").show();
    if (boardValues[num].type === 'Property') {
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
                    <label>${boardValues[num].name} is not owned, would you like to purchase property for ${boardValues[num].price}?</label>
                    <button class='btn btn-default' id='buy-prop'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
            $('#buy-prop').on('click', function() {
                globalPlayers[player].money -= boardValues[num].price;
                boardValues[num].isOwned = true;
                boardValues[num].owner = globalPlayers[player].uuid;
                promptPlayer();
            });
        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    <button class='btn btn-default' id='rent-owed'>Pay Owner</button>
                    `);
            $('#rent-owed').on('click', function() {
                globalPlayers[player].money -= boardValues[num].rent;
                globalPlayers[boardValues[num].owner] += boardValues[num].rent;
                promptPlayer();
            });
        } else if (boardValues[num].isMortgaged === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned and mortgaged.</label>
                    <p>Enjoy your free stay.</p>
                    `);
        }
    } else if (boardValues[num].type === 'RR') {
        $('#prop-info').html(`
                <label>${boardValues[num].name}</label>
                <p>Rent                  ${boardValues[num].rent}</p>
                <p>If 2 R.R.'s are owned ${boardValues[num].rentOne}</p>
                <p>If 3 R.R.'s are owned ${boardValues[num].rentTwo}</p>
                <p>If 4 R.R.'s are owned ${boardValues[num].rentThree}</p>
                <br>
                <p>Mortgage Value        ${boardValues[num].mortgage}</p>
                `);
        if (boardValues[num].isOwned === false) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is not owned, would you like to purchase property for ${boardValues[num].price}?</label>
                    <button class='btn btn-default' id='buy-prop'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
             $('#buy-prop').on('click', function() {
                globalPlayers[player].money -= boardValues[num].price;
                boardValues[num].isOwned = true;
                boardValues[num].owner = globalPlayers[player].uuid;
                promptPlayer();
            });
        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    <button class="btn btn-default" id="ok">OK</button>
                    `);
            $("#ok").on('click', function() {
                promptPlayer();
            });
        }
    } else if (boardValues[num].type === 'Utility') {
        $('#prop-info').html(`
                <label>${boardValues[num].name}</label>
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
                    <label>${boardValues[num].name} is not owned, would you like to purchase property for ${boardValues[num].price}?</label>
                    <button class='btn btn-default' id='buy-prop'>I would love to!</button>
                    <button class='btn btn-default'>Nah, I'm good</button>
                `);
            promptPlayer();
        } else if (boardValues[num].isOwned === true) {
            $('#buy-opt').html(`
                    <label>${boardValues[num].name} is owned by ${boardValues[num].owner}.</label>
                    <p>You owe them money for rent.</p>
                    <button class="btn btn-default" id="ok">OK</button>
                    `);
            $("#ok").on('click', function() {
                promptPlayer();
            });
        }
    } else if (boardValues[num].id === 4) {
        $('#prop-info').html(`
                <label>${boardValues[num].name}</label>
                <br>
                <p>Pay 10%</p>
                <p>   or   </p>
                <p>$200</p>
                `);
        $('#buy-opt').html(`
                <button class='btn btn-default'>Pay 10%</button>
                <button class='btn btn-default'>Pay $200</button>
                `);
        promptPlayer();
    } else if (boardValues[num].id === 38) {
        $('#prop-info').html(`
                <label>LUXURY TAX</label>
                <br>
                <p>PAY $75.00</p>    
                `);
        $('#buy-opt').html(`
                <button class='btn btn-default' id="ok">Pay $75</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
    } else if (boardValues[num].type === 'Chance') {
        $('#prop-info').html(`
                <label>CHANCE</label>    
                `);
        $('#buy-opt').html(`
            <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });

    } else if (boardValues[num].type === 'Chest') {
        $('#prop-info').html(`
                <label>COMMUNITY CHEST</label>
                `);
        $('#buy-opt').html(`
            <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
    } else if (boardValues[num].type === 'Go') {
        $('#prop-info').html(`
                <label>GO</label>
                <p>COLLECT</p>
                <p>$200.00 SALARY</p>
                <p>AS YOU PASS</p>
                `);
        $('#buy-opt').html(`
            <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
    } else if (boardValues[num].type === 'Free') {
        $('prop-info').html(`
                <label>FREE PARKING</label>
                `);
        $('#buy-opt').html(`
            <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
    } else if (boardValues[num].type === 'Jail') {
        $('prop-info').html(`
                <label>GO TO JAIL</label>
                <p>Go directly to jail</p>
                <p>Do not pass go,</p>
                <p>Do not collect $200</p>
                `);
        $('#buy-opt').html(`
                        <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
    } else if (boardValues[num].type === 'Visiting') {
        $('prop-info').html(`
                <label>JUST VISITING</label>
                `);
        $('#buy-opt').html(`
                        <button class="btn btn-default" id="ok">OK</button>
                `);
        $("#ok").on('click', function() {
            promptPlayer();
        });
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
            element.player_piece = playerPiece;
            // $(playerPiece).show();
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
