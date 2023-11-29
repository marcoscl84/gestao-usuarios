var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
const User = require("../models/User");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', UserController.index);

module.exports = router;