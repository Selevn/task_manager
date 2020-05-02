const router = require('express').Router();
const login_controller = require("../controllers/login_controller");
const passport = require("passport");



router.get("/",login_controller.login_form);
router.get("/logout/",require('../models/auth').logout, (req,res)=>{res.redirect('/login')});
router.get("/register/",login_controller.register_form);
router.post("/register/",login_controller.register_add);
router.post("/",passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'}));
router.get("/sec",require('../models/auth').checkAuth,login_controller.secret);

module.exports = router;