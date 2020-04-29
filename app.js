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

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

app.post('/login', function (req, res) {
  var u_i = req.body.u_i;
  var pas = req.body.pas;
  
  if ((u_i == "Jane") && (pas =="12345")) {
    res.sendFile(path.join(__dirname+'/home.html'));
  }
  else if ((u_i == "Admin")&&(pas == "123456")){
    res.sendFile(path.join(__dirname+'/homePage.html'));
  }
  else if ((u_i == "Tayo")&&(pas == "1234")) {
    res.sendFile(path.join(__dirname+'/home.html'));
  }
  else if ((u_i == "Simi")&&(pas == "2222")) {
    res.sendFile(path.join(__dirname+'/home.html'));
  }
  else {
    res.end(`
    <a href="/"> Error Return to Login Page!!</a>
    `)
  }
})

// create sales
app.post('/submit', function(req,res){

  var punum=req.body.punum;
  var dop=req.body.dop;
  var ci=req.body.ci;
  var ic=req.body.ic;

  var sql = "INSERT INTO sales (purchase_number, date_of_purchase, customer_id, item_code) VALUES ('"+punum+"', '"+dop+"', '"+ci+"', '"+ic+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.sendFile(path.join(__dirname+'/home.html'));
  });
  });
   

// create customer
  app.post('/submitt', function(req,res){

    var fn=req.body.fn;
    var ln=req.body.ln;
    var ea=req.body.ea;
    var noc=req.body.noc;
  
  
    var sql = "INSERT INTO customer (first_name, last_name, email_address, n_of_comp) VALUES ('"+fn+"', '"+ln+"', '"+ea+"', '"+noc+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.sendFile(path.join(__dirname+'/homePage.html'));
    });
  
  });

// delete customer
app.post('/delete', function(req, res){
  var cui=req.body.cui;

    var sql = "delete from customer where customer_id = '"+cui+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.sendFile(path.join(__dirname+'/homePage.html'));
  });
});

// send to create Item page
app.post('/submit2', function(req,res){
    res.sendFile(path.join(__dirname+'/main.html'));
  });

// Create Item
app.post('/submit4', function(req,res){

  var i_c=req.body.i_c;
  var i=req.body.i;
  var upu=req.body.upu;
  var c_id=req.body.c_id;

  var sql = "INSERT INTO item (item_code, item, u_p_usd, company_id) VALUES ('"+i_c+"', '"+i+"', '"+upu+"', '"+c_id+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.sendFile(path.join(__dirname+'/homePage.html'));

});
// delete item
app.post('/delete', function(req, res){
  var idd=req.body.idd;
    var sql = "delete from item where item_code = '"+idd+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.sendFile(path.join(__dirname+'/main.html'));
  });
});

//redirect to company page
app.post('/submitted', function(req, res){
  res.sendFile(path.join(__dirname+'/company.html'));

});

//create company page
app.post('/submitttt', function(req,res){

  var ii=req.body.ii;
  var hpn=req.body.hpn;
  var cna=req.body.cna;
  var sql = "INSERT INTO company (item, hq_p_no, company_name) VALUES ('"+ii+"', '"+hpn+"', '"+cna+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.sendFile(path.join(__dirname+'/HomePage.html'));
  });

});

//to delete company

app.post('/deletee', function(req, res){
  var cna=req.body.dc;

    var sql = "delete from company where company_id = '"+cna+"'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.sendFile(path.join(__dirname+'/homePage.html'));
  });
});
});

app.listen(3080);
console.log("Running at Port 3080");