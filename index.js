var express = require('express')
var app = express();
var router = express.Router(); 	

var cool = require('cool-ascii-faces');

app.use(express.logger('dev'));

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(express.static(__dirname + '/assets'));

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
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
  response.send(cool());
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