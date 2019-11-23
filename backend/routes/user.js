const router = require("express").Router();

const UserController = require("../controllers/user");

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("", UserController.getUsers);

module.exports = router;
