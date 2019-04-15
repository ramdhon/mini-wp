const express = require('express');
const router = express.Router();

const register = require('./register'); 
const login = require('./login');
const glogin = require('./glogin');
const articles = require('./articles');

router.use('/register', register);
router.use('/login', login);
router.use('/glogin', glogin);
router.use('/articles', articles);


module.exports = router;