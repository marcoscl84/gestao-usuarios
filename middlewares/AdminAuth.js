var jwt = require("jsonwebtoken");
var secret = "umsegredoqualquerparagerarotokejwtbeleza";

module.exports = function(req, res, next){

    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try {
            var decodedResponse = jwt.verify(token, secret);

            if(decodedResponse.role == 1){
                next();
            } else {
                res.status(403);
                res.send("Você não está autorizado!");
                return;
            }
        } catch (error) {
            console.log(error);
        }

    } else {
        res.status(403);
        res.send("Você não está autorizado!");
        return;
    }

}