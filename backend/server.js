var express = require('express')
var app = express()
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  console.log('MS_Ordnungsamt is running! Port:' + port);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

