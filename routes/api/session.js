module.exports = function(router,controller){
    //创建token
    return router.post('/create',controller.create);
};
