
"use strict";
var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1201066Grace",
  port: '4190',
  database: "market"
});

app.get('/', function(request, response){
  fetchData(response);
});

con.connect(function(err) {
  if (err) throw err;
function executeQuery(sql, cb){
  db.query(sql, function(error, result, fields){
    if(error) { throw error;}
    cb(result);
  })
}

});

function fetchData(response){
  exccuteQuery("select * from sales", function(result){
    response.write('<table><tr>');
    for (var column in result[0]){
      response.write('<td><label>' + column + '</label></td>');
      res.write('</tr>');
    }
    for (var row in result){
      response.write('<tr>');
      for(var column in result[row]) {
        response.write('<td><label>') + result [row][column] + ('</label></td>');

      }
      response.write('</tr');
    }
    response.end('</table>');

  });

}
