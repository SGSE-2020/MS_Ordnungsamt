const Mali = require('mali')
const path = require('path');

const gRpcServer = new Mali();
const GRPC_PORT = 50051;
const PROTO_PATH = path.resolve(__dirname, '../proto/oamt.proto');
var dbservice = require('./db_service');

gRpcServer.addService(PROTO_PATH, 'OAmtService');

//No one is calling, therefore dummy data
var genehmigungen = async function (param) {
    try {
        param.res = {amount : 2, genehmigungenjarray : ['genehmigung1','genehmigung2']};
    }catch(err){
        console.error("ERROR: " + err.message);
        param.res = {amount : 0, genehmigungenjarray : null};
    }
};
//No one is calling, therefore dummy data
var ordnungswidrigkeiten = async function (param) {
    try {
        param.res = {amount : 3, ordnungswidrigkeitenjarray : ['ordnungswidrigkeiten1','ordnungswidrigkeiten2','ordnungswidrigkeiten3']};
    }catch(err){
        console.error("ERROR: " + err.message);
        param.res = {amount : 0, ordnungswidrigkeitenjarray : null};
    }
};

module.exports.ordnungswidrigkeiten = ordnungswidrigkeiten;
module.exports.genehmigungen = genehmigungen;

/*Launch gRPC server*/
gRpcServer.use({ genehmigungen, ordnungswidrigkeiten});
gRpcServer.start("0.0.0.0:" + GRPC_PORT);
console.log("[GRPC Server] Init on port: " + GRPC_PORT);