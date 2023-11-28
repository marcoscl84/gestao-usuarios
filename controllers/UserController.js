class UserController{

    async index(req, res){

    }

    async create(req, res){
        var { email, name, password } = req.body;

        if(email == undefined){
            res.status(400);
            res.json({ error: "O e-mail não foi definido!"})
        }

        res.status(200);
        res.send("Pegando o corpo da requisição!")
    }
}

module.exports = new UserController();