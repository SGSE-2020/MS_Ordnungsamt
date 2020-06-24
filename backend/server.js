var express = require('express')
var app = express()
var port = process.env.PORT || 8080;
var gn_count = 0
var ow_count = 0

var server = app.listen(port, function() {
  console.log('MS_Ordnungsamt is running! Port:' + port);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/ordnungswidrigkeiten', function (req, res) {
  res.json({ow : [ "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++]});
});

app.get('/genehmigungen', function (req, res) {
  res.json({gn : [ "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++]});
});