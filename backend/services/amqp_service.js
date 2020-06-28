
var amqp = require('amqp');
var connection = amqp.createConnection({ host: 'ms-rabbitmq', port: 5672, password: 'sgseistgeil', login: 'testmanager', connectionTimeout: 10000});
var exchange = null
var last_error = null

connection.on('error', function(e) {
    console.log("[AMQP-Service] ", e);
    last_error = e;
  });
   

connection.on('ready', function () {
  console.log('[AMQP-Service] Connection init complete.')
  exchange = connection.declareExchange('ordnungsamt' ,{type : 'fanout'},function (exchange) {
    console.log('[AMQP-Service] ' + exchange.name + ' is open/declared.');
    afterInit();
  });
});

function afterInit(){

}

module.exports  = {
  sendMessage : (message) => {
    console.log('[AMQP-Service] Called to send message: '. message);
    //TODO: Send Message
    exchange.publish('','Testmessageblblblb');
  },
  lastError : () => {
    return last_error;
  }
};