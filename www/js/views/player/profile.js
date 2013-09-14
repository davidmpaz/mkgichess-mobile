define([
    'vm',
    'app',
    'jquery',
    'baseview',
    'mustache',
    'libs/data/countries',
    'views/player/stats',
    'views/player/country',
    'text!templates/player/profile.html'
], function (Vm, CordovaApp, $, BaseView, Mustache, Countries, StatView, CountryView, profilePageTemplate) {
    var ProfilePage = BaseView.extend({
        el: '.page',
        events: {
            'click a#save-profile' : 'saveUserData'
        },
        initialize: function () {
            // assume the model instance is already attached when creating this view
            this.model.on('change', this.enhance, this);
        },
        render: function () {
            this.model.set('server_url', CordovaApp.user_settings.server);

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

            // store the profile merged with settings
            var settings = _.extend(this.model.toJSON(), data);

            // save settings and profile
            CordovaApp.saveSettings(settings);
        },
        takePicture: function () {
            //TODO invoke cordova capture to take a picture
        }
    });

    return ProfilePage;
});
