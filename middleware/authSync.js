const md5 = require("md5");
module.exports = function(req,res,next){
    try {
        var password = md5(req.headers['password']);
        var username = req.headers['username'];
        if(password == process.env.PASSWORD_AUTH_SYSTEM&& 
           username == process.env.USERNAME_AUTH_SYSTEM){
            return next();
        }
        return res.status(401).send('Unauthorized');   
    } catch (error) {
        return res.status(401).send('Unauthorized');  
    }
}