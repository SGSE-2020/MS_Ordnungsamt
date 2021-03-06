
var amqp = require('amqp');
var dbservice = require('./db_service');

//Init DB connection
dbservice.initialize();

const connectionObj = {
  host: 'ms-rabbitmq',
  port: 5672,
  login: 'testmanager',
  password: 'sgseistgeil',
  vhost: '/'
};

const exchange_parkplatz = 'parkplatz';
const exchange_ordnungsamt = 'ordnungsamt';
const queue_ordnungsamt_parkplatz = 'ordnungsamt_falschparker';

const connection = amqp.createConnection(connectionObj);

var exc = null;
var amqp_log = []

connection.on('error', function(e) {
  console.log("[AMQP-Service] ", e);
  amqp_log.push("AMQP Connection error: " + e);
});

connection.on('ready', function () {
  console.log('[AMQP-Service] Connection init complete.')
  amqp_log.push("Connection init complete");
  //Define exchange to publish
  exc = connection.exchange(exchange_ordnungsamt, {
    type: 'fanout',
    durable: true,
    autoDelete: false
  }, (exchangeRes) => {
    amqp_log.push("AMQP exchange '" + exchangeRes.name + "' established.");
  });
  exc.on('error', error => {
    amqp_log.push("AMQP Exchange error: " + error.message);
  });
  //Define queue to bind
  connection.queue(queue_ordnungsamt_parkplatz, queue => {
    amqp_log.push("Queue " + queue_ordnungsamt_parkplatz + " created.");
    queue.bind(exchange_parkplatz, queue_ordnungsamt_parkplatz, callback => {
      amqp_log.push("AMQP queue '" + queue.name + "' is bound to exchange: " + exchange_parkplatz + ".");
      queue.subscribe((msg) => {
        amqp_log.push("Message incoming: " + JSON.stringify(msg));
        var db_obj = { name: msg.userId, description: msg.userNote, type: 'Falschparker', state : 'unbearbeitet'};
        dbservice.getDB().collection('ordnungswidrigkeiten').insertOne(db_obj, function(err, res) {
          if (err) throw err;
          amqp_log.push("Eine Message in DB übertragen");
        });
      });
    });
  });
});

var sendMessage = function(data) {
  exc.publish('', Buffer.from(JSON.stringify(data)), {
    appId: 'Ordnungsamt',
    timestamp: new Date().getTime(),
    contentType: 'application/json',
    type: ''
  }, () => {
    amqp_log.push("AMQP - Published message: " + JSON.stringify(data));
  });
};

var getLog = function() {
  return JSON.stringify(amqp_log);
}

module.exports.sendMessage = sendMessage;
module.exports.getLog = getLog