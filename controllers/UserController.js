var User = require("../models/User")
var PasswordToken = require("../models/PasswordToken")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "umsegredoqualquerparagerarotokejwtbeleza";

class UserController{

    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res){
        var { email, name, password } = req.body;

        if(email == undefined || email == '' || email == ' '){
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

    async edit(req, res){
        var {id, email, nome, role} = req.body;
        var result = await User.update(id, email, nome, role);

        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Editado com sucesso!")
            } else {
                res.status(406);
                res.send(result.error);
            }
        } else {
            res.status(406);
            res.send("Erro no servidor!");
        }
    }

    async delete(req, res){
        var id = req.params.id;
        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Excluído com sucesso!");
        } else {
            res.status(406);
            res.send(result.error);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.send("" + result.token);
        } else {
            res.status(406);
            res.send(result.error);
        }
    }

    async changePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;

        var  isTokenValid = await PasswordToken.validate(token);

        if(isTokenValid.status){

            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada!");
        } else {
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){

            var resultCompare = await bcrypt.compare(password, user.password);

            res.json({ status: resultCompare })
            if(resultCompare){

                var token = jwt.sign({ email: user.email, role: user.role }, secret);

                res.status(200);
                req.json({token: token});

            } else {
                res.status(406);
                res.send("Senha incorreta!");
            }

        } else {
            res.json({ status: false })
        }
    }
}

module.exports = new UserController();