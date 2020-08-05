var express = require('express');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9873);

var apiKey = '7414cea8a9072a6199aaa8c051b0021e';

app.get('/',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);
  res.render('toDo',context);
});

app.post('/',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']){
    req.session.toDo.push({"name":req.body.toDoName, "city":req.body.city, "temp":req.body.temp, "id":req.session.curId});
    req.session.curId++;

	  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + '&APPID=' + apiKey, function(err, response, body){
		if(!err && response.statusCode < 400){
			var response = JSON.parse(body)
			var temp = response.main.temp;
			var faren = parseInt(9/5*(response.main.temp - 273) + 32);
			if(req.body.temp > temp){
				console.log("green");
			} else {
				console.log("red");
			}
		} else {
		  if(response){
			console.log(response.statusCode);
		  }
		  next(err);
		}
	  });

  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('toDo',context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
