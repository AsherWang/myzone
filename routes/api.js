var express = require('express');
var router = express.Router();
var express_jwt = require('express-jwt');
var config = require('../config/api');
var fs = require('fs');

//api接口需要auth验证
//header中需要写Authorization: Bearer空格+token
router.use(express_jwt({secret: config.secret}).unless({path: ['/api/session/create']}));


//测试用
router.get('/test', function (req, res) {
    console.log('recived');
    res.status(200).send('ok');
});

//以下是api路由的加载方式，路由和api下路由名字一致
files = fs.readdirSync('./routes/api');
for (index in files) {
    name = '/' + files[index].slice(0, -3);
    router.use(name, require(__dirname + '/api' + name));
}

module.exports = router;
