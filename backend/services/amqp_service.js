
var amqp = require('amqp');

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
    amqp_log.push("Queue" + queue_ordnungsamt_parkplatz + "created.");
    queue.bind(exchange_parkplatz, queue_ordnungsamt_parkplatz, callback => {
      amqp_log.push("AMQP queue '" + queue.name + "' is bound to exchange: " + exchange_parkplatz + ".");
      queue.subscribe((msg) => {
        amqp_log.push("Message incoming: " + msg);
      });
    });
  });
});


module.exports  = {
  sendMessage : (message) => {
    console.log("Message published");
    exc.publish('','Testmessageblblblb');
  },
  lastError : () => {
    return amqp_log;
  }
};