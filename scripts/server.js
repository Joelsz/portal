var fs = require('fs');
var telegramLink = require('telegram.link');
var tg = telegramLink();

module.exports = function Server(config){

	var server = http.createServer(function (req, res) {

		this.router = new config.router(req, res);
		
	});

	var hostname = '127.0.0.1', port = '1111';
	server.listen(port, hostname, function(a){
		console.log('Server running at http://' + hostname + ':' + port + '/');
	});
	server.on('error', function(e){
		console.log(e.stack);
	});

}