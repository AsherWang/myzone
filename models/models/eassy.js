//文章model
//标题，内容，标签，创建时间，更新时间
//浏览次数(考虑用百度统计，不行的话就自己记录好了，不过感觉略费事儿。。。怎么都费事儿好吧)
//文本内容使用html_encode,允许使用部分js函数，因为是给自己用嘛
//标签的话，打算用外键的形式来做

module.exports = function (db, models) {
    models.eassy = db.define(
        "eassy",
        {
            id: {type: 'serial', key: true}, // the auto-incrementing primary key
            title: {type: 'text'},
            content: {type: 'text'},
            created_at: {type: 'date'},
            updated_at: {type: 'date'}
        },
        {
            hooks: {
                beforeCreate: function () {
                        this.created_at=new Date();
                },
                beforeSave: function () {
                        this.updated_at=new Date();
                    }
                }
        });
};