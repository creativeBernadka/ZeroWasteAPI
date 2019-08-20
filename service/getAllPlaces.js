const dbConnection = require("../models/dbConnection");
const {validateToken, getPayload} = require("./validateToken");

exports.getAllPlaces = function(req, res) {
    if (req.headers.origin === "localhost:8100"){
        const jwt = req.header("Authorization");
        if(validateToken(jwt)){
            const payload = getPayload(jwt);
            if (payload.isAdmin === "true"){
                dbConnection.query(
                    'SELECT places_id, place_name, latitude, longitude, type_of_place, verified FROM places',
                    function (err, rows, fields) {
                        if (err) throw err;
                        return res.json({
                            places: rows
                        })
                    });
            }
            else{
                dbConnection.query(
                    'SELECT places_id, place_name, latitude, longitude, type_of_place, place_owner FROM places' +
                    ' WHERE place_owner = ?',
                    [payload.userId],
                    function (err, rows, fields) {
                        if (err) throw err;
                        return res.json({
                            places: rows
                        })
                    });
            }
        }
        else{
            return res.sendStatus(401);
        }
    }
    else{
        dbConnection.query(
            'SELECT places_id, place_name, latitude, longitude, type_of_place FROM places',
            function (err, rows, fields) {
                if (err) throw err;
                return res.json({
                    places: rows
                })
            });
    }
};
