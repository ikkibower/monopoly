// Global vars
var piece;
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
$('#submit').on("click", function() {
    event.preventDefault();
    piece = Snap.load("", function(loadedFragment) {
        s.image("assets/img/car.svg", 540, 540, 50, 50);
        s.append(loadedFragment);
    });
});
// Roll Dice Function
$('#roll').on("click", function() {
    event.preventDefault();
    var dice = [];
    var spaces = 0;
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
});
// Call Game Space
function callSpace(num) {
    console.log(num);
    console.log(boardValues[num]);
}

$('#roll').on('click', function() {

});

// function purchaseProperty

// Get 'boardvalues' in appController
function getBoardValue(num) {
    $.get('/api/propertys', function(data) {
        console.log(data[num]);
        if (data[num].type === property) {
            $('#prop-info').html(`
                <label>TITLE DEEDS</label>
                <p>${data[num].name}</p>
                <br>
                <p>RENT ${data[num].rent}</p>
                <p>With 1 House   ${data[num].rentOne}</p>
                <p>With 2 House   ${data[num].rentTwo}</p>
                <p>With 3 House   ${data[num].rentThree}</p>
                <p>With 4 House   ${data[num].rentFour}</p>
                <p>With HOTEL   ${data[num].rentHotel}</p>
                <p>Mortgage Value ${data[num].mortgage}</p>
            `)
            if (data[num].owned === false) {
                $('#buy-opt').html(`
                    <label>${date[num].name} is not owned, would you like to purchase property?</label>
                    <button>I would love to!</button>
                    <button>Nah, I'm good</button>
                `)
            } else if (data[num].owned = 1) {


        }

        } 
    });
}

// <p>Houses cost ${data[num].houseCost} each</p>
// <p>Hotels, ${data[num].hotels.Cost} plus 4 houses</p>
