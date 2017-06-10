/*Roll Object*/
var Roll = {
    startRoll: function(num) {
    	var strRoll = '#roll-';
    	var strDiv = '#roll-div';
    	var rollVal = '#start-roll';
        strRoll += num;
        strDiv += num;
        rollVal += num;
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
            $(rollVal).val(spaces);
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
				<select name="piece"  class="form-control">
				<option>Thimble</option>
				<option>Wheelbarrow</option>
				<option>Boot</option>
				<option>Dog</option>
				<option>Car</option>
				<optioIron</option>
				<option>Hat</option>
				<option>Battleship</option>
				</select>
				
				<br>
				<div id="roll-div${i}">
				<label for="roll-val${i}">Roll Value</label>
                <input type="text" name="rollvalue" class="form-control" id="start-roll${i}" placeholder="Roll Value" readonly>				
				<button type="submit" class="btn btn-default" class="roll-start" id="roll-${i}">Roll</button>
				</div>
				</div>				
				
            	`);            
            Roll.startRoll(i);
        }



     });
}



selectPlayers();




