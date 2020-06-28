var express = require('express')
const caller = require('grpc-caller')
const path = require('path');
var app = express()

var port = process.env.PORT || 8080;

//Proto Files
const PROTO_PATH_ANNOUNCEMENT = path.resolve(__dirname, '../proto/announcement.proto')
const PROTO_PATH_USER = path.resolve(__dirname, '../proto/user.proto')


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
    

module.exports  = function(amqpservice,grpcservice)  {
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

app.get('/log', function (req, res) {
    console.log("REST CALL: /log - Log Requested")
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
    amqpservice.sendMessage(req);
});

//Server start
var server = app.listen(port, function() {
    console.log('MS_Ordnungsamt is running! Port:' + port);
});

};