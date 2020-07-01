//TODO Database Stuff

var grpc_caller_service = require('./services/grpc_caller_service')

var amqpservice = require('./services/amqp_service')

var grpcservice = require('./services/grpc_service')

var restservice = require('./services/rest_service')(amqpservice,grpc_caller_service)