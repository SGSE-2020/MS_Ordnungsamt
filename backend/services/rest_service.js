var express = require('express')
const bodyParser = require('body-parser');
var dbservice = require('./db_service');

//Init DB connection
dbservice.initialize();

var envType = process.env.NODE_ENV;

var app = express()

var port = process.env.PORT || 8080;

var rest_log = []
var db_log = []
var grpc_log = []

//GRPC Stuff
const caller = require('grpc-caller')
const path = require('path');
const Collection = require('mongodb/lib/collection');

//Other Settings
const GRPC_BUERGERBUERO = 'ms-buergerbuero:';
const GRPC_BANK = 'ms-bank:';
const GRPC_PORT = 50051;

//Proto Files
const PROTO_PATH_ANNOUNCEMENT = path.resolve(__dirname, '../proto/announcement.proto');
const PROTO_PATH_USER = path.resolve(__dirname, '../proto/user.proto');
const PROTO_PATH_BANK = path.resolve(__dirname, '../proto/account.proto');

const grpcBankService = caller(GRPC_BANK + GRPC_PORT, PROTO_PATH_BANK, 'AccountService');
const grpcAnnouncementService = caller(GRPC_BUERGERBUERO + GRPC_PORT, PROTO_PATH_ANNOUNCEMENT, 'AnnouncementService');
const grpcUserService = caller(GRPC_BUERGERBUERO + GRPC_PORT, PROTO_PATH_USER, 'UserService');


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports  = function(amqpservice)  {
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
    res.send(grpc_log);
});

app.get('/restlog', function (req, res) {
    console.log("REST CALL: /restlog - Log Requested");
    res.send(rest_log);
});

app.get('/dblog', function (req, res) {
    console.log("REST CALL: /dblog - Log Requested");
    res.send(db_log);
});

app.get('/ordnungswidrigkeiten', function (req, res) {
    console.log("REST CALL: /ordnungswidrigkeiten");
    res.json({ow : [ "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++ , "ordnungswidrigkeiten"+gn_count++]});
});

app.get('/genehmigungen', function (req, res) {
    console.log("REST CALL: /genehmigungen");
    res.json({gn : [ "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++ , "genehmigungen"+ow_count++]});
});

app.delete('/setupDB', function (req, res) {
    dbservice.getDB().collection("accounts").deleteMany({}, function(err,result){
        if (err) {
            db_log.push("error deleteing accounts");
        } else {
            db_log.push("success deleting accounts");
            dbservice.getDB().collection("accounts").insertOne({
                "_id": "4K2kEHYd9OWNL3TQOhpWN0uk8dC3",
                "firstName": "Hans",
                "lastName": "Ordnung",
                "nickName": "Alman",
                "email": "meister@lampe.de",
                "birthDate": "11.9.2001"
            }, function (err, result) {
                if (err) {
                    db_log.push("error readding init worker account")
                } else {
                    db_log.push("success readding init worker account")
                }
            });
        }
    });
    dbservice.getDB().collection("roles").deleteMany({}, function (err, result) {
        if (err) {
            db_log.push("error deleteing roles")
        } else {
            db_log.push("success deleteing roles")

            var data = {
                "_id": '4K2kEHYd9OWNL3TQOhpWN0uk8dC3',
                roles: ['user', 'worker']
            }
            dbservice.getDB().collection("roles").update({
                "_id": data._id
            }, data, {
                upsert: true
            }, function (err, result) {
                if (err) {
                    db_log.push("error readding oamt mitarbeiter")
                } else {
                    db_log.push("success readding oamt mitarbeiter")
                }
            });
        }
    });

    dbservice.getDB().collection("permissions").deleteMany({}, function (err, result) {
        if (err) {
            db_log.push("error deleteing permissions")
        } else {
            db_log.push("success deleteing permissions")
        }
    });

    dbservice.getDB().collection("ordnungswidrigkeiten").deleteMany({}, function (err, result) {
        if (err) {
            db_log.push("error deleteing ordnungswidrigkeiten")
        } else {
            db_log.push("success deleteing ordnungswidrigkeiten")
        }
    });

    res.status(200).send('ok');
});

app.get('/announcePermission', function (req, res) {
    console.log("REST CALL: /announcePermission");
    amqpservice.sendMessage("Hallo");
    res.json({answer : "message sent"});
});

//Begin User sensitive request
// Auth
if(envType != "development"){
    app.use(function (req, res, next) {
        console.log(req.method + " " + req.url);

        if (!req.headers.authorization) {
            return res.status(401).json({
                error: 'No credentials sent!'
            });
        } else {
            try {
                grpcUserService.verifyUser({
                        token: req.headers.authorization
                    })
                    .then(result => {
                        res.type('application/json');
                        if (result.uid) {
                            req.headers["X-User"] = result.uid;
                            next();
                        } else {
                            rest_log.push(result);
                            res.status(401).send({
                                error: 'Invalid token!'
                            });
                        }
                    }).catch(err => {
                        console.error(err)
                        res.status(500).send({
                            position: "grpc catch",
                            error: JSON.stringify(err)
                        })
                    })
            } catch (e) {
                res.status(500).send({
                    position: "catch",
                    error: JSON.stringify(e)
                })
            }
        }
    });
}else {
    app.use(function (req, res, next) {
        console.log(req.method + " " + req.url);

        req.headers["X-User"] = "4K2kEHYd9OWNL3TQOhpWN0uk8dC3";
        next();
    });
}

app.get('/gnofuser', function (req, res) {
    console.log("REST CALL: /gnofuser");
    var query = { name: req.headers["X-User"]};

    dbservice.getDB().collection("ordnungswidrigkeiten").find(query).toArray(function(err, result) {
        if (err) rest_log.push(err)
        rest_log.push(result)
        res.json(result);
      });
    
});

app.get('/anofuser', function (req, res) {
    console.log("REST CALL: /anofuser");
    var query = { name: req.headers["X-User"]};

    dbservice.getDB().collection("permissions").find(query).toArray(function(err, result) {
        if (err) rest_log.push(err)
        rest_log.push(result)
        res.json(result);
      });
    
});

app.put('/newGenehmigung', function (req, res){
    rest_log.push("newGenehmigung called: " + req.headers["X-User"]);
});

//Server start
var server = app.listen(port, function() {
    console.log('MS_Ordnungsamt is running! Port:' + port);
});

};