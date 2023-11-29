var knex = require("../database/connection");
var User = require("../models/User")

class PasswordToken {

    async create(email){
        var user = await User.findByEmail(email);

        if(user != undefined){
            
            try {

                var token = Date.now();

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token // usar UUID nos projetos
                }).table("passwordtoken");

                return {status: true, token: token}
            } catch (error) {
                console.log(error);
                return {status: false, error: error}
            }


        } else {
            return {status: false, error: "E-mail não encontrado no banco de dados."}
        }
    }

    async validate(token){
        try {
            var result = await knex.select().where({token: token}).table("passwordtoken");

            if(result.length > 0){
                var tkn = result[0];

                if(tkn.used){
                    return {status: false};
                } else {
                    return {status: true, token: tkn};
                }

            } else {
                return {status: false};
            }
        } catch (error) {
            
        }
        
    }

}

module.exports = new PasswordToken();