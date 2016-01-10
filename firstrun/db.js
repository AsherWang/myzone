//在这里为mysql建表
var mysql = require('mysql');
var db_config = require('../config/mysql'); //数据库配置
var connection = mysql.createConnection(db_config);

connection.connect();

//创建user表
var user_sql = "CREATE TABLE IF NOT EXISTS `user` (`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,`name` text COLLATE utf8_bin NOT NULL,`password` text COLLATE utf8_bin NOT NULL,`age` int(11) NOT NULL,PRIMARY KEY (`id`),UNIQUE KEY `id` (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2; ";

//创建eassy表
var eassy_sql = "CREATE TABLE IF NOT EXISTS `eassy` (`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,`title` text COLLATE utf8_bin NOT NULL,`content` text COLLATE utf8_bin NOT NULL,`created_at` datetime DEFAULT NULL,`updated_at` datetime DEFAULT NULL,    PRIMARY KEY (`id`),UNIQUE KEY `id` (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=10 ;";

var sqls = {
    user: user_sql,
    eassy: eassy_sql
};

for (var key in sqls) {
    connection.query(sqls[key]);
}
console.log('done');
connection.end();
