var config = require('../../config/api');
var jwt = require('jsonwebtoken');
var session = module.exports;
//Éú³Étoken
function createToken(user) {
    return jwt.sign(user.omit('password'), config.secret, {expiresIn: config.token_expire_time});
}

session.create = function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({status: 'fail', err_msg: "The username or password is not right"});
    }
    req.models.user.find({name: req.body.username}, function (err, user) {
        user = user[0];
        if (!user || user.password !== req.body.password) {
            return res.status(401).send({
                status: 'fail',
                err_msg: "The username or password is not right!"
            });
        }
        res.status(201).send({
            status: 'success',
            token: createToken(user)
        });
    });
};