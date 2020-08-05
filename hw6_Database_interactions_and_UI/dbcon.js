var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_gutowskg',
  password        : '5149',
  database        : 'cs290_gutowskg'
});

module.exports.pool = pool;
