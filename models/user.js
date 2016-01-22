var _ = require('lodash');
module.exports = function (db, models) {
    models.user = db.define("user", {
        id: {type: 'serial', key: true}, // the auto-incrementing primary key
        name: {type: 'text'},
        password: {type: 'text'},
        age: {type: 'number'}
    }, {
        methods: {
            omit: function (param) {
                return _.omit(this, param);
            }
        }
    });
};