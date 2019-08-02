const dbConnection = require("../models/dbConnection");

exports.getAllPlaces = function(req, res) {
    dbConnection.query(
        'SELECT places_id, place_name, latitude, longitude, type_of_place FROM places',
        function (err, rows, fields) {
            if (err) throw err;
            return res.json({
                places: rows
            })
        });
};
