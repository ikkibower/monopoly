var s = Snap('#svg');
// s.attr({ viewBox: "0 0 600 900" });

// var board = s.board();
var piece;

// var board = s.image("monopoly.svg", 0, 0, 600, 600);

var board = Snap.load("", function(loadedFragment) {
    s.image("assets/img/monopoly.svg", 0, 0, 600, 600);
    s.image("assets/img/path.svg", 0, 0, 600, 600);
    s.append(loadedFragment);

});


$('#submit').on("click", function() {
    event.preventDefault();
    piece = Snap.load("", function(loadedFragment) {
        s.image("assets/img/car.svg", 540, 540, 50, 50);
        s.append(loadedFragment);
    });
});

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
    
    console.log(dice, spaces);
});
