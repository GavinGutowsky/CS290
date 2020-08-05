var express = require('express');
var mysql = require('./dbcon.js');
const cors = require('cors');

var app = express();
app.set('port', 9159);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const getAllQuery = 'SELECT * FROM workout';
const insertQuery = "INSERT INTO workout (`name`, `reps`, `weight`, `unit`, `date`) VALUES (?, ?, ? ,? ,?)";
const updateQuery = "UPDATE workout SET name=?, reps=?, weight=?, unit=?, date=? WHERE id=? ";
const deleteQuery = "DELETE FROM workout WHERE id=?";
const dropTableQuery = "DROP TABLE IF EXISTS workout";
const makeTableQuery = `CREATE TABLE workout(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255) NOT NULL,
                        reps INT NOT NULL,
                        weight INT NOT NULL,
                        unit BOOLEAN NOT NULL,
                        date DATE NOT NULL);`;

// Unit of 0 is lbs unit of 1 is kg

const getAllData = (res, next) => {
  mysql.pool.query(getAllQuery, (err, rows, fields) => {
    if(err){
      next(err);
      return;
    }
    res.json({rows: rows});
  });
};

app.get('/',function(req,res,next){
  mysql.pool.query(getAllQuery, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    getAllData(res, next);
  });
});

app.post('/',function(req,res,next){
  console.log(req.body)
  console.log("Post request works");
  var {name, reps, weight, unit, date} = req.body;
  mysql.pool.query(insertQuery, [name, reps, weight, unit, date], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res, next);
  });
});

app.delete('/',function(req,res,next){
  console.log(req.body);
  var {id} = req.body;
  mysql.pool.query(deleteQuery, [id], function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res, next);
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.put('/',function(req,res,next){
  var {id, name, reps, weight, unit, date} = req.body;
  mysql.pool.query(updateQuery,
    [id, name, reps, weight, unit, date],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    getAllData(res, next);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query(dropTableQuery, function(err){
    mysql.pool.query(makeTableQuery, function(err){
      res.send('Table reset')
    });
  });
});

app.use(function(req,res){
  res.status(404);
  res.send('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
