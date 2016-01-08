module.exports = function (db,models) {
    models.user=db.define("user", {
        id:      {type: 'serial', key: true}, // the auto-incrementing primary key
        name:    {type: 'text'},
        age:     {type: 'number'}
    });
};