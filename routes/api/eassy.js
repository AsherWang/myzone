//记得return最后一个use
module.exports = function (router, controller) {
    return router
        .get('/',controller.index)
        .get('/:id', controller.show)
        .post('/', controller.create)
        .post('/:id', controller.update)
        .delete('/:id', controller.destroy);
};
