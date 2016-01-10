var express = require('express');  //expree框架
var orm = require('orm');  //嗯orm
var logger = require('morgan');  //记录日志
var bodyParser = require('body-parser');  //解析request参数
//var multer = require('multer');  //如果需要用到文件上传等功能
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({extended: false}));// for parsing application/x-www-form-urlencoded


//使用orm+mysql
app.use(orm.express("mysql://asher:asher@localhost/myzone", {
    define: function (db, models) {
        var files = require('fs').readdirSync('./models/models');
        for (var index in files) {
            require("./models/models/" + files[index])(db, models);
        }
        //为所有models添加自定义的公共方法
        require('./models/common')(models);
    }
}));

//路由
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('API Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});
module.exports = app;
