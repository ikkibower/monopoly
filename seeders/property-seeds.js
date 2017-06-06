var db = require("./models");

db.Property.create({
	id: 0,
	name: 'Go',
	type: 'go'
}).then(function(dbUser){
	console.log(dbUser);
});