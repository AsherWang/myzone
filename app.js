var express = require('express');
var orm = require('orm');
//var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
//var multer = require('multer');  //如果需要用到文件上传等功能

var routers = require('./routes/api');
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//the logo of your website
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({extended: false}));// for parsing application/x-www-form-urlencoded

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//使用orm连接mysql
app.use(orm.express("mysql://asher:asher@localhost/myzone", {
    define: function (db, models) {
        var files = fs.readdirSync('./models/models');
        for (var index in files) {
            require("./models/models/" + files[index])(db, models);
        }
        //为所有models添加自定义的公共方法
        require('./models/common')(models);
    }
}));


app.use('/api', routers);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('API Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
