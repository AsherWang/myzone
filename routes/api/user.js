var express = require('express');
var router = express.Router();
var controller=require('../../controllers/api/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//router.get('/hello',controller.test);
module.exports = router;
