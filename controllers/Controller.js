'use strict';

const getAll = require('../service/getAllPlaces');
const getDescription = require('../service/getPlacesDescriptionById');
const {validatePassword} = require("../service/validatePassword");

module.exports.getAllPlaces = function getAllPlaces (req, res, next) {
  getAll.getAllPlaces(req, res);
};

module.exports.getPlaceDescriptionById = function getPlaceDescriptionById (req, res, next) {
  const placeId = req.swagger.params['placeId'].value;
  const dayOfWeek = req.swagger.params['dayOfWeek'].value;
  getDescription.getPlaceDescriptionById(req, res, placeId, dayOfWeek);
};

module.exports.authUser = function authUser(req, res, next) {
  validatePassword(req, res);
};
