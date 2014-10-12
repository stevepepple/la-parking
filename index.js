var express = require('express');
var morgan = require('morgan')
var app = express();
var router = express.Router(); 

app.use(morgan('combined'));

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'));


/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var marked = require('marked');

var fs = require('fs');
//var md2html = require( "md2html" );
var hbs;

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
	
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets & data
    app.use(express.static(__dirname + '/dist/assets'));
    app.use(express.static(__dirname + '/dist/data'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
    app.use(express.static(__dirname + '/dist/data'));
}

// Set Handlebars
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
	
	function readModuleFile(path, callback) {
	    try {
	        var filename = require.resolve(path);
	        fs.readFile(filename, 'utf8', callback);
	    } catch (e) {
	        callback(e);
	    }
	}

	readModuleFile('./README.md', function (err, string) {
	    console.log( "Converting Read Me" );
		var header = 	'<meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Wayfinding Map</title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">' + 
						'<link rel="stylesheet" href="styles/index.less" type="text/less" media="screen"/>' + 
						'<script src="bower_components/less.js/dist/less-1.7.0.js" type="text/javascript" charset="utf-8"></script>';
					
		var html = "<html><head>" + header + "</head><body><article class='markdown-body'>" + marked(string) + "</article></body>";
		
		response.send( html );
		
	});
	
});

app.get('/map', function(request, response, next) {
    response.render('map', {layout : "map"});
});

app.get('/parking', function(request, response, next) {
    response.render('parking', {layout : "parking"});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});