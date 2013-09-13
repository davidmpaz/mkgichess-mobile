define([
    'lodash',
    'backbone'
], function (_, Backbone) {
    var playerModel = Backbone.Model.extend({
        defaults: {
            username: '', password: '', realname: '', gender: '', age: '', country: '',
            email: '', creation_date: '', score_win: '', score_draw: '', score_losses: '',
            score_points: '', notification_delay: '', is_admin: '', portrait: ''
        },
        initialize: function () {
        }

    });

    return playerModel;

});
