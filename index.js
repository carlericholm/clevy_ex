const con = require('./config/database');
const express = require('express');
const app = express();

const recastai = require('recastai').default;
const tools = require('./back/tools');

// Usefull const
const PORT = 8080;
const GET_NAME_API = 'https://randomuser.me/api/';
const RECAST_TOKEN = '901ae589a236643b918f5f6a293adfde';
// get string passed as first argument
const ARG = process.argv[2];

const request = new recastai.request(RECAST_TOKEN);

request.analyseText(ARG)
.then((res) => {
    // get the intent detected
    const intent = res.intent();
    if (intent)
    {
      tools.logResult(intent, GET_NAME_API, ARG);
    }
		else
			console.log(' // Sorry, unknown intent');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT);
