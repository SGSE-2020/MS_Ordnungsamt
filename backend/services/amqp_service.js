
var amqp = require('amqp');


var last_error = null

connection.on('error', function(e) {
    console.log("[AMQP-Service] ", e);
    last_error = e;
  });
   

connection.on('ready', function () {
  console.log('[AMQP-Service] Connection init complete.')
  last_error = "Connection init complete"
});

function afterInit(){

}

module.exports  = {
  sendMessage : (message) => {
    var connection = amqp.createConnection({ url: "amqp://testmanager:sgseistgeil@ms-rabbitmq:5672"}, {defaultExchangeName: "ordnungsamt"});
    console.log('[AMQP-Service] Called to send message: '. message);
    //TODO: Send Message
    connection.publish('','Testmessageblblblb');
  },
  lastError : () => {
    return last_error;
  }
};