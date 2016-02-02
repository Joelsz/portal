var fs = require('fs'),
	path = require('path')
	shelljs = require('shelljs'),
	_ = require('lodash'),
	url = require('url'),
	http = require('http'),
	Server = require('./Server'),
	express = require('express');

var app = express();

function Router(){

/*var config = require(path.resolve('scripts/config.json'));
var directories = config.directories;

var filePath = config.directories.source;
var finalFilePath = false;

var pathname = url.parse(req.url).pathname;
var paths = {
	pages: function(urlPathname){
		var pageName = urlPathname === '/' ? 'portal' : urlPathname.substr(0, urlPathname.indexOf('.html')).substr(7);
		return filePath + 'tpl/pages/' + pageName + '/' + pageName + '.html';
	},
	css: filePath + pathname,
	js: filePath + pathname,
	plugins: filePath + 'js' + pathname,
	img: filePath + pathname,
	api: false
};*/

var server = app.listen('1111', function(){
	var host = server.address().host;
	var port = server.address().port;

	console.log('server listening on ', host, port);

	var config = require(path.resolve('scripts/config.json'));
	var directories = config.directories;

	


	_.each(config.routes, function(route){
		app.get(route.regex, function(req, res){

			var filePath = config.directories.source;
			var finalFilePath = false;

			var pathname = url.parse(req.url).pathname;
			var paths = {
				pages: function(urlPathname){
					var pageName = urlPathname === '/' ? 'portal' : urlPathname.substr(0, urlPathname.indexOf('.html')).substr(7);
					return filePath + 'tpl/pages/' + pageName + '/' + pageName + '.html';
				},
				css: filePath + pathname,
				js: filePath + pathname,
				plugins: filePath + 'js' + pathname,
				img: filePath + pathname,
				api: false
			};

			console.log(route.type);
		})
	})
});

/*_.each(config.routes, function(route){

	app.get(route.regex, function(){
		console.log(route.toString());
	});

	if(new RegExp(route.regex).test(pathname)){
		finalFilePath = _.isFunction(paths[route.type]) ? paths[route.type].call(null, pathname) : paths[route.type];
		if(route.contentType)
			res.setHeader('content-type', route.contentType);
		return false;
	}
});*/

/*console.log('pathname: ' + pathname);
console.log('finalFilePath: ' + finalFilePath);*/

/*if(finalFilePath)
	if(fs.existsSync(finalFilePath))
		fs.readFile(finalFilePath, function(err, chunk){
			if(err)
				console.log(err);
			else {
				res.writeHead(200);
				res.write(chunk);
				res.end();
			}
		});
	else {
		res.writeHead(404);
		res.end('404 File not found');
	}
else // api
	res.end('{}');*/

}

Router();

//start the server
/*new Server({router: Router});*/