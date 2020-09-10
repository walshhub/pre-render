#!/usr/bin/env node
cool().then(function () {
     console.log("Promise Resolved");
}).catch(function () {
     console.log("Promise Rejected");
});

async function cool() {
	const chromium = require('chromium');
	chromium.install()

	console.log("before");
	while(!chromium.path) {
		console.log("sleep")
		await new Promise(r => setTimeout(r, 20000));
	}
	console.log("after");

	var prerender = require('./lib');

	var server = prerender({
    		chromeLocation: chromium.path
	});

	server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
	server.use(prerender.removeScriptTags());
	server.use(prerender.httpHeaders());

	server.start();
	return true;
}
