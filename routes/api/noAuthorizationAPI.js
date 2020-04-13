const express = require('express');
const router = express.Router();

require('./loginAPI')(router);
require('./imagesAPI')(router);


module.exports = router;