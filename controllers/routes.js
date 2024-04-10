const { Router } = require("express");
const signup_login_services = require("../services/signup_login_services");

const router = Router();


router.post("/signup", signup_login_services.signUp);

router.post("/login", signup_login_services.logIn);

module.exports = router;
