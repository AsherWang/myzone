var express = require('express');
var router = express.Router();
var session=require('../../controllers/api/session');

//创建token
router.post('/create',session.create);

module.exports = router;
