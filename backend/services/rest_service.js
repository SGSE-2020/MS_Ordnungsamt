var express = require('express')
const bodyParser = require('body-parser');

var app = express()

var port = process.env.PORT || 8080;


//Tempo
var gn_count = 0
var ow_count = 0

/*Header*/
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser);
    

module.exports  = function(amqpservice,grpcservice,grpc_caller_service)  {
/**
* Returns if the rest server is alive
*/
app.get("/alive", function(req, res) {
    console.log("REST CALL: /alive");
    let responseObj = {
        status:"success",
        message: "Server is alive."
    }
    res.status(200);
    res.send(responseObj);
});

app.get('/amqplog', function (req, res) {
    console.log("REST CALL: /amqplog - Log Requested");
    res.send(amqpservice.getLog());
});

app.get('/grpclog', function (req, res) {
    console.log("REST CALL: /grpclog - Log Requested");
    res.send(grpc_caller_service.getLog());
});

app.get('/verify', function (req, res) {
    console.log("REST CALL: /grpclog - Log Requested");
    var state = grpc_caller_service.verifyUserGRPC(req.body);
});

app.get('/ordnungswidrigkeiten', function (req, res) {
    console.log("REST CALL: /ordnungswidrigkeiten");
    res.json({ow : [ "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++]});
});

app.get('/genehmigungen', function (req, res) {
    console.log("REST CALL: /genehmigungen");
    res.json({gn : [ "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++]});
});

app.get('/announcePermission', function (req, res) {
    console.log("REST CALL: /announcePermission");
    amqpservice.sendMessage("Hallo");
    res.json({answer : "message sent"});
});


//Server start
var server = app.listen(port, function() {
    console.log('MS_Ordnungsamt is running! Port:' + port);
});

};