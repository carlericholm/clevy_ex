const fetch = require('node-fetch');
const fs = require('fs');
const csv = require('fast-csv');
const stream = fs.createReadStream("answers.csv");
var con = require('../config/database');

const getName = (GET_NAME_API) => {
	return fetch(GET_NAME_API)
		.then(res => res.json())
		.then(json => {
			var firstname = json.results[0].name.first;
			var lastname = json.results[0].name.last;
			var name = firstname + ' ' + lastname;
			return name;
		});
};

const addLogDb = (question, answer) => {
	var sql = "INSERT INTO logs set question = ?, answer = ?";
	con.query(sql, [question, answer],(err) => { if (err) throw err;});
};

module.exports = {
	// parses csv file, check matching intent, log the result
	logResult: (intent, GET_NAME_API, question) => {
		var array = new Array();
		var csvStream = csv
			.parse({delimiter: ';'})
			.on("data", (data) => {
				array.push(data);
			})
			.on("end", () => {
				array.forEach((element) => {
					if (element[0] === intent.slug)
					{
						if (intent.slug === 'ask-creator')
						{
							getName(GET_NAME_API).then((name) => {
								var str = element[1].replace('${name}', name);
								//add question / answer into DB
								addLogDb(question, str);
								console.log(" // " + str);
							});
						}
						else
						{
							//add question / answer into DB
							addLogDb(question, element[1]);
							console.log(" // " + element[1]);
						}
					}
				});
			});
		stream.pipe(csvStream);
	}
};