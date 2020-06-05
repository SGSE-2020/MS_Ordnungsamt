var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('MS_Ordnungsamt is running! Port:' + port);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

