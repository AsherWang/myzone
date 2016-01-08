var express = require('express');
var router = express.Router();
var express_jwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('../config');
var fs = require('fs');

function createToken(user) {
    return jwt.sign(user.omit('password'), config.api.secret, {expiresIn: 60 * 60 * 2});
}

//api接口需要auth验证
//header中需要写Authorization: Bearer空格+token
router.use(express_jwt({secret: config.api.secret}).unless({path: ['/api/session/create', '/api/test']}));


//用户获取之后请求需要的token
router.use('/session/create', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({status: 'fail', err_msg: "The username or password is not right"});
    }
    req.models.user.find({name: req.body.username}, function (err, user) {
        user = user[0];
        if (!user || user.password !== req.body.password) {
            return res.status(401).send({
                status: 'fail',
                err_msg: "The username or password is not right"
            });
        }
        res.status(201).send({
            status: 'success',
            token: createToken(user)
        });
    });
});

//测试用
router.get('/test', function (req, res) {
    console.log('recived');
    req.models.user.remove({name:'12'},function(err){
        if(err){
            res.status(200).json(err);
        }else
        {
            res.status(200).send('ok');
        }

    });
});

//以下是api路由的加载方式，路由和api下路由名字一致
files = fs.readdirSync('./routes/api');
for (index in files) {
    name = '/' + files[index].slice(0, -3);
    router.use(name, require(__dirname + '/api' + name));
}

module.exports = router;
