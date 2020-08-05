var express = require('express');

var app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 9874);

app.get('/',function(req,res){   
	var qParams = [];
	for (var par in req.query) {
		qParams.push({'name': par,'value':req.query[par]})
	}
	var context = {};
	context.param = qParams;
  
	res.render("home", context);
});

app.post('/',function(req,res){
	var context = {};
	
	var qParams = [];
	for (var par in req.query) {
		qParams.push({'name':par,'value':req.query[par]})
	}
	context.param = qParams;
	
	var bParams = [];
	for (var par in req.body) {
		bParams.push({'name':par,'value':req.body[par]})
	}
	context.param2 = bParams;
	
	console.log(req.body);
	console.log(bParams);
  
	res.render("other-page", context);
});

app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
