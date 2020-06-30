
var amqp = require('amqp');

var amqp_url = "amqp://testmanager:sgseistgeil@ms-rabbitmq:5672/";
var amqp_url_dev = "amqp://testmanager:sgseistgeil@ms-rabbitmq:5672/";

var last_error = null

//connection.on('error', function(e) {
 //   console.log("[AMQP-Service] ", e);
  //  last_error = e;
  //});
   

//connection.on('ready', function () {
 // console.log('[AMQP-Service] Connection init complete.')
 // last_error = "Connection init complete"
//});


module.exports  = {
  sendMessage : (message) => {
    var connection = amqp.createConnection({ url: amqp_url_dev},{defaultExchangeName: "ordnungsamt"});
    connection.on('error', function(e) {
      console.log("[AMQP-Service] ", e);
      last_error = e;
    });
    console.log('[AMQP-Service] Called to send message: '+ message);
    //TODO: Send Message
    connection.on('ready', function () {
      console.log('[AMQP-Service] Connection init complete.')
      last_error = "Connection init complete";
      connection.publish('','Testmessageblblblb');
    });
    
  },
  lastError : () => {
    return last_error;
  }
};