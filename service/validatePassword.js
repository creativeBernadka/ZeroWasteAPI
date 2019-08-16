const util = require('util');
const dbConnection = require("../models/dbConnection");
const query = util.promisify(dbConnection.query).bind(dbConnection);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

async function verifyUserCredentials (username, password){

    let user = [];

    try{
        user = await query(
            'SELECT user_login, user_password FROM users WHERE user_login = ?',
            [username]
        );
    }
    catch (err) {
        throw err
    }

    if (user.length !== 0){
        return await bcrypt.compare(password, user[0].user_password)
    }
    return false
}

async function findUserIdAndPermission(username){
    let user = [];

    try{
        user = await query(
            'SELECT user_id, is_admin FROM users WHERE user_login = ?',
            [username]
        );
    }
    catch (err) {
        throw err
    }
    return [user[0].user_id, user[0].is_admin]
}

exports.validatePassword = async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    let verified = "false";

    try{
        verified = await verifyUserCredentials(username, password);
    }
    catch (err) {
        throw err
    }
    if (verified){
        let [userId, isAdmin] = [0, "false"];
        try{
            [userId, isAdmin] = await findUserIdAndPermission(username);
        }
        catch (err) {
            throw (err)
        }

        const jwtBearerToken = jwt.sign({
            expiresIn: 120,
            userId: userId,
            isAdmin: isAdmin.toString()
        }, config.jwt.hs256_key, {});

        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 120
        });

    }
    else {
        res.sendStatus(401);
    }
    // if (validateEmailAndPassword()) {
    //     const userId = findUserIdForEmail(email);
    //
    //     const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
    //         algorithm: 'RS256',
    //         expiresIn: 120,
    //         subject: userId
    //     })
    // }
    // else {
    //     // send status 401 Unauthorized
    //     res.sendStatus(401);
    // }
};
