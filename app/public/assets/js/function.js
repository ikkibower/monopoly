// Global vars
var piece;
// Snap.svg Setup
var s = Snap('#svg');
var sd = Snap('#dice-svg');
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
        sd.image("assets/img/die" + dice[0] + ".svg", 0, 0, 40, 40);
        sd.image("assets/img/die" + dice[1] + ".svg", 50, 0, 40, 40);
        sd.append(loadedFragment);
    });
    getBoardValue(spaces);
    console.log(dice, spaces);
});
// Call Game Space
function callSpace(num) {
    console.log(num);
    console.log(boardValues[num]);
}


// Get 'boardvalues' in appController
function getBoardValue(num) {
    $.get('/api/propertys', function(data) {
        console.log(data[num]);
    });
}
