const express = require('express');
const google = express.Router();

const UserController = require('../../controllers/user');


google.post('/', UserController.glogin);


module.exports = google;