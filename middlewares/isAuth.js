const jwt = require ('express-jwt');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = jwt({
  secret: 'MySuP3R_z3kr3t.',
  userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  getToken: getTokenFromHeader,
  algorithms:['HS256']
})