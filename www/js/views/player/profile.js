define([
    'vm',
    'app',
    'jquery',
    'backbone',
    'baseview',
    'mustache',
    'models/player',
    'libs/data/countries',
    'views/player/stats',
    'views/player/country',
    'text!templates/player/profile.html'
], function (Vm, CordovaApp, $, Backbone, BaseView, Mustache, PlayerModel, Countries,
             StatView, CountryView, profilePageTemplate) {

    var ProfilePage = BaseView.extend({
        el: '.page',
        events: {
            'click #save-profile' : 'saveUserData'
        },
        initialize: function () {
            // assume the model instance is already attached when creating this view
            this.model.on('change', this.enhance, this);
        },
        render: function () {

            this.$el.html(Mustache.render(profilePageTemplate, this.model.toJSON()));

            var statView = Vm.create(this, 'StatView', StatView, {model: this.model});
            statView.render();

            var countriesView = Vm.create(this, 'CountriesView', CountryView,
                {model: this.model, countries: Countries.getCountries()});
            countriesView.render();
        },
        saveUserData: function () {

            var data = _.reduce($('#profile-form').serializeArray(), function (settings, field) {
                settings[field.name] = field.value;
                return settings;
            }, {});

            this.model.set(data);
            // save remotely
            //this.model.save();

            if (this.model.isValid()) {
                // save settings and profile
                CordovaApp.saveSettings(this.model.toJSON());
                Backbone.history.navigate('#/home');
            }
        },
        takePicture: function () {
            //TODO invoke cordova capture to take a picture
        }
    });

    return ProfilePage;
});
