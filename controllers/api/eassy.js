var is=require("is_js");
var _ = require('lodash');
var eassy = module.exports;
var cb=function(res){
    return function(err,results){
        if(err)
        {
            res.status(200).send({err:err});
        }
        else
        {
            res.status(200).send({data:results || 'success'});
        }
    };
};


eassy.index=function(req,res){
    if(is.isNumber(req.params.limit) && is.isNumber(req.params.offset))
    {
        req.models.eassy.offset(req.params.offset).limit(req.params.limit).run(cb(res));
    }
    else
    {
        res.status(200).send({err:'error params'});
    }
};

eassy.show=function(req,res){
    req.models.eassy.find({id:req.params.id},cb(res));
};

eassy.create=function(req,res){
    eassy=req.models.eassy.create(req.params,cb(res));
};

eassy.update=function(req,res){
    req.models.eassy.get(req.params.id, function (err, result) {
        if(!err){
            result.save(_.omit(req.params,'id'),cb(res));
        }else{
            res.status(200).send({err:err});
        }
    });
};

eassy.destroy=function(req,res){
    req.models.eassy.get(req.params.id, function (err, result) {
        if(!err){
            result.remove(cb(res));
        }else{
            res.status(200).send({err:err});
        }
    });
};