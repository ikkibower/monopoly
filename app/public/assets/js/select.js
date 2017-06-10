/*Roll Object*/
var Roll = {
    startRoll: function(num) {
    	var strRoll = '#roll-';
    	var strDiv = '#roll-div';
        strRoll += num;
        strDiv += num;
        console.log(strRoll);
        $(strRoll).on('click', function() {
            event.preventDefault();
            var dice = [];
            var spaces = 0;
            for (i = 0; i < 2; i++) {
                var val = Math.floor(Math.random() * 6) + 1;
                dice.push(val);
                spaces += val;
            }
            $(strDiv).append(`<h4>${spaces}</h4>`);
            console.log(spaces);
        });
    }
};
var pieces = ['thimble','wheelbarrow','boot','dog','car','iron','hat','battleship'];

function selectPlayers() {
    $.get('/api/user', function(data) {
        console.log(data.players);
        for (i = 0; i < data.players; i++) {
            $('#select-players').append(`
            	<label>Player ${i+1}</label>            	
				<div id="player-${i}>
				<div class="form-group">
                <label for="playername">Player Name</label>
                <input type="text" name="playername" class="form-control" id="player_name" placeholder="Player Name">
            	</div>
				<label for="piece${i}">Choose Piece</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox1" value="option1"> Thimble
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox2" value="option2"> Wheelbarrow
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox3" value="option3"> Boot
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox1" value="option1"> Dog
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox2" value="option2"> Car
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox3" value="option3"> Iron
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox1" value="option1"> Hat
				</label>
				<label class="checkbox-inline">
				<input type="checkbox" id="inlineCheckbox2" value="option2"> Battleship
				</label>
				</div>
				<br>
				<div id="roll-div${i}">				
				<button type="submit" class="btn btn-default" class="roll-start" id="roll-${i}">Roll</button>
				</div>				
				
            	`);            
            Roll.startRoll(i);
        }



     });
}



selectPlayers();




