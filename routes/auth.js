var express = require("express");
var router = express.Router();
var db = require("../models/index");

const AuthService = require("../services/auth");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

router.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    try {
        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.Login(email, password);
        return res.status(200).json({ user, token }).end();
    } catch (e) {
        console.log(e)
        return res.json(e).status(500).end();
    }
});

// The middlewares need to be placed this way because they depend upong each other
/*router.post("/login-as",
  isAuth,
  attachCurrentUser,
  checkRole("admin"),
  async (req, res) => {
    try {
      const email = req.body.user.email;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.LoginAs(email);
      return res.status(200).json({ user, token }).end();
    } catch (e) {
      console.log("Error in login as user: ", e);
      return res.json(e).status(500).end();
    }
  }
);*/

router.post("/register", isAuth, attachCurrentUser, checkRole("admin"), async(req, res) => {
    try {
        const { name, email, password, phone, last_name, club_id = null } = req.body;

        const authServiceInstance = new AuthService();
        const { user, token } = await authServiceInstance.register(
            email,
            password,
            name,
            last_name,
            phone,
            club_id
        );
        return res.json({ user, token }).status(200).end();
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
});


module.exports = router;