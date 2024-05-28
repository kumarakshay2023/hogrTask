const express = require('express');
const { registerUser, login } = require('../controllers/user.controller');


const router = express.Router();

router.post("/register",registerUser);
router.get("/login",login)


module.exports = router