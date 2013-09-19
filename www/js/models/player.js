define([
    'lodash',
    'backbone',
    'libs/data/countries'
], function (_, Backbone, Countries) {
    var playerModel = Backbone.Model.extend({
        defaults: {
            identifier: '', password: '', real_name: '', gender: 'm', age: 0, country: 'cu',
            email_address: '', creation_date: '', score_wins: 0, score_draws: 0, score_losses: 0,
            score_points: 0, notification_delay: '', is_admin: 0,
            portrait: "",
            genderLong: function () {
                return this.gender == 'm' ? 'Male' : 'Female';
            },
            countryLong: function () {
                return Countries.getCountryName(this.country.toUpperCase())
            },
            score_games: function () {
                return parseInt(this.score_wins) + parseInt(this.score_draws) + parseInt(this.score_losses);
            }
        },
        initialize: function () {
        }


    });

    return playerModel;

});
