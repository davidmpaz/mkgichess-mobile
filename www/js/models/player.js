define([
    'lodash',
    'backbone',
    'libs/data/countries'
], function (_, Backbone, Countries) {
    var playerModel = Backbone.Model.extend({
        defaults: {
            username: '', password: '', realname: '', gender: '', age: '', country: '',
            email: '', creation_date: '', score_win: '', score_draw: '', score_losses: '',
            score_points: '', notification_delay: '', is_admin: '', portrait: '',
            genderLong: function () { return this.gender == 'm' ? 'Male' : 'Female'; },
            countryLong: function () { return Countries.getCountryName(this.country)},
            score_games: function () {return this.score_win + this.score_draw + this.score_losses}
        },
        initialize: function () {
        }

    });

    return playerModel;

});
