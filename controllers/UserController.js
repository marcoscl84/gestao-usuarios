var User = require("../models/User")

class UserController{

    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async create(req, res){
        var { email, name, password } = req.body;

        if(email == undefined){
            res.status(400);
            res.json({ error: "O e-mail não foi definido!"})
            return;
        }

        var emailExists = await User.findEmail(email);;

        if(emailExists){
            res.status(406);
            res.json({ error: "O e-mail já está cadastrado."});
            return;
        }

        await User.newUser(email, password, name);

        res.status(200);
        res.send("Usuário cadastrado!")
    }
}

module.exports = new UserController();