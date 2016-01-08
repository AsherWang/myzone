//文章model
//标题，内容，标签，创建时间，更新时间
//浏览次数(考虑用百度统计，不行的话就自己记录好了，不过感觉略费事儿。。。怎么都费事儿好吧)

module.exports = function (db,models) {
    models.eassy=db.define("eassy", {
        id:      {type: 'serial', key: true}, // the auto-incrementing primary key
        name:    {type: 'text'},
        age:     {type: 'number'}
    });
};