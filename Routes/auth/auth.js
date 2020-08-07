//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();

//@ http method GET
//@description its AUTH get information
//@access PUBLIC

/*=======================LOGIN GET ROUTE =========================*/
router.get('/login', (req, res) => {
  res.render('./auth/login')
})

/*=======================REGISTER GET ROUTE =========================*/
router.get("/register", (req, res) => {
res.render("./auth/register");
});

//@ http method POST
//@description its AUTH get information
//@access PUBLIC
/*=======================LOGIN POST ROUTE =========================*/
/*=======================REGISTER POST ROUTE =========================*/
module.exports = router;