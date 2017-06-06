var boardValues = [{
	id: 0,
    name: "Go",

}, {
	id: 1,
    name: "Mediterranean Avenue",
    cost: 60,
    mortgage: 30,
    rent: [2, 4, 10, 30, 90, 160, 250],
    owned: false,
    owner: '',
}, {
	id: 2,
    name: "Community Chest", 
},{
	id: 3,
	name: "Baltic Avenue",
	cost: 60,
	mortgage: 30,
	rent:[4,20,60,180,320,450],
	owned: false,
	}
];





function callSpace(num){
	console.log(num);
	console.log(boardValues[num]);
}

$('#roll').on('click', function(){
	callSpace(1);
});

// Get 'boardvalues' in appController
function getBoardValue() {
	$.get('/api/propertys', function(data) {
		console.log(data);
	});
}

getBoardValue();
// name: ["Mediterranean Avenue", "Community Chest", "Baltic Avenue", "Income Tax", "Reading RR", Oriental Avenue, Chance, Vermont Avenue, Connecticut Avenue, St Charles Place]

// module.exports = boardValues;