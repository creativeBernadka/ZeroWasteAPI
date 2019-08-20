const jwt = require('jsonwebtoken');
const config = require('../config');

exports.validateToken = function (token) {
    try{
        jwt.verify(token, config.jwt.hs256_key);
        return true
    }
    catch (err){
        return false
    }
};

exports.getPayload = function (token) {
    return jwt.verify(token, config.jwt.hs256_key);
};
