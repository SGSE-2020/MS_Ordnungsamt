
var amqp = require('amqp');

const connectionObj = {
  host: 'ms-rabbitmq',
  port: 5672,
  login: 'testmanager',
  password: 'sgseistgeil',
  vhost: '/'
};

var amqp_url = "amqp://administrator:sgse2020@ms-rabbitmq:5672/";
var amqp_url_dev = "amqp://aelsovie:l-gjNtM4_dqaFQdB-ZAOTrGZljQmAGWq@wolverine.rmq.cloudamqp.com/aelsovie";

//var connection = amqp.createConnection({ url: amqp_url});
const connection = amqp.createConnection(connectionObj);

var exc = null;
var last_error = null

connection.on('error', function(e) {
  console.log("[AMQP-Service] ", e);
  last_error = "AMQP Connection error: " + e;
});
   

connection.on('ready', function () {
  console.log('[AMQP-Service] Connection init complete.')
  last_error = "Connection init complete"
  //exc = connection.exchange('ordnungsamt2',{type : 'fanout'}, function (exchange) {
    //console.log('Exchange ' + exc.name + ' is open');
    //last_error = "Exchange is open";
  //});
  exc = connection.exchange('ordnungsamt', {
    type: 'fanout',
    durable: true,
    autoDelete: false
  }, (exchangeRes) => {
    last_error = "AMQP exchange '" + exchangeRes.name + "' established.";
  });
  exc.on('error', error => {
    last_error = "AMQP Exchange error: " + error.message;
  });
});


module.exports  = {
  sendMessage : (message) => {
    console.log("Message published");
    exc.publish('','Testmessageblblblb');
  },
  lastError : () => {
    return last_error;
  }
};