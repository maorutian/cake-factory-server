const express = require('express');
const router = express.Router();

require('./categoryAPI')(router);
require('./productAPI')(router);
require('./imagesAPI')(router);
require('./roleAPI')(router);
require('./userAPI')(router);

module.exports = router;