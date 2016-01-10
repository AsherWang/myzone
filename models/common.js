//为已经定义好的model添加额外方法
module.exports=function(models){
    for(var index in models) {
        var model=models[index];

        //删除
        model.remove = function (query, cb) {
            model.find(query, function (err, items) {
                if (!err && items.length > 0) {
                    for(var index in items)
                    {
                        items[index].remove();
                    }
                    if(cb)cb();
                }
                else {
                    cb({message: 'no item found'});
                }
            });
        };


        //更新
        //更新就先不写了






    }
};