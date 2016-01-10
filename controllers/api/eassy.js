var eassy = module.exports;

eassy.index=function(req,res){
    var list=[
        {id:1,title:233},
        {id:2,title:233},
        {id:3,title:1233}
    ];
    res.status(200).send(list);
};

eassy.show=function(req,res){
    res.status(200).send(req.params.id+'show');
};

eassy.create=function(req,res){
    eassy=req.models.eassy.create({
        title:'asher',
        content:'2333'
    },function(err){
        res.status(200).send('create');
    });
};

eassy.update=function(req,res){
    res.status(200).send(req.params.id+'update');
};

eassy.destroy=function(req,res){
    res.status(200).send(req.params.id+'destroy');
};