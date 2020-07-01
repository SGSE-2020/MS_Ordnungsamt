const caller = require('grpc-caller')
const path = require('path');

//Other Settings
const GRPC_BUERGERBUERO = 'ms-buergerbuero:';
const GRPC_PORT = 50051;

//Proto Files
const PROTO_PATH_ANNOUNCEMENT = path.resolve(__dirname, '../proto/announcement.proto');
const PROTO_PATH_USER = path.resolve(__dirname, '../proto/user.proto');

var grpc_log = []

const grpcAnnouncementService = caller(GRPC_BUERGERBUERO + GRPC_PORT, PROTO_PATH_ANNOUNCEMENT, 'AnnouncementService');
const grpcUserService = caller(GRPC_BUERGERBUERO + GRPC_PORT, PROTO_PATH_USER, 'UserService');

var getLog = function() {
    return JSON.stringify(grpc_log);
};

function verifyUserGRPC(user_token) {
    grpcClient.verifyUser({ token: user_token }, (err, res) => {
        if (res.uid) {
            //verfiy true
            return res.uid;
        } else {
            //verfiy false
            return false
        }
        grpc_log.push(err);
    });    
};

module.exports.getLog = getLog
module.exports.verifyUserGRPC = verifyUserGRPC