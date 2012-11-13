
/**
 * Module dependencies.
 */

var   express 		= require('express')
    , root			= require('./routes/root.js')
	, create		= require('./routes/create.js')
    , app			= module.exports = express.createServer()
	, MemoryStore 	= express.session.MemoryStore
	, sessionStore 	= new MemoryStore({ reapInterval: 60000 * 10 })
;

// Configuration

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.cookieParser( 'asdiufhaisd7fh8asd6fg3645r34'));
	app.use(express.session({
		store	: sessionStore,
		key		: 'shopperlo.sid',
		secret	: 'asdiufhaisd7fh8asd6fg3645r34',
	}));
	app.register(".html", require('handlebars'));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', root.router);
app.post('/', root.router);
app.get('/create/*', create.router);

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
