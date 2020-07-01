var amqpservice = require('./services/amqp_service')

var grpcservice = require('./services/grpc_service')

var restservice = require('./services/rest_service')(amqpservice)