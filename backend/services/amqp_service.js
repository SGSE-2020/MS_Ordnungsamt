
var amqp = require('amqp');

var amqp_url = "amqp://testmanager:sgseistgeil@ms-rabbitmq:5672/";
var amqp_url_dev = "amqp://aelsovie:l-gjNtM4_dqaFQdB-ZAOTrGZljQmAGWq@wolverine.rmq.cloudamqp.com/aelsovie";

var connection = amqp.createConnection({ url: amqp_url});
var exc = null;
var last_error = null

connection.on('error', function(e) {
  console.log("[AMQP-Service] ", e);
  last_error = e;
});
   

connection.on('ready', function () {
  console.log('[AMQP-Service] Connection init complete.')
  last_error = "Connection init complete"
  exc = connection.exchange('ordnungsamt2',{type : 'fanout'}, function (exchange) {
    console.log('Exchange ' + exc.name + ' is open');
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