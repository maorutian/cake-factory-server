const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //get the token from header
  const token = req.header('x-auth-token');
  //console.log(token);
  //check if token is there
  if (!token) {
    return res.status(400).send({errors: [{msg: "No token! Authorization denied!"}]});
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({errors: [{msg: "Token is not valid"}]});
  }
};
