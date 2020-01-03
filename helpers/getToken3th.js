var jwt = require('jsonwebtoken');
var tokenSecret = "e563b96dadb800b4916a18fcb070c778";
module.exports = function generateToken(){
    return {
        token: jwt.sign(
            {id: process.env.KEY_ID_API_SHOPPING_CART},
            tokenSecret,
            {
              expiresIn : 60*60*24
            }
          ),
        username: process.env.USERNAME_API_SHOPPING_CART,
        url: process.env.URL_API_SHOPPING_CART
    }
  }
  