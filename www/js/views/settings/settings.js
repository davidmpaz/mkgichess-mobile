define([
    'jquery',
    'lodash',
    'backbone',
    'baseview',
    'mustache',
    'models/player',
    'libs/cordova/restclient',
    'text!templates/settings/page.html'
], function ($, _, Backbone, BaseView, Mustache, PlayerModel, Rest, settingsPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        events: {
            'click a#test-server': 'testServer',
            'click a#save-data': 'saveUserData'
        },
        render: function () {

            this.model.set('gender', this.model.get('gender') == 'f');

            var tpl = Mustache.render(settingsPageTemplate, this.model.toJSON());

            $(this.el).html(tpl);
        },
        testServer: function (ev) {
            ev.preventDefault();
            var self = this;

            Rest.testServer({server: this.$('#server').val()}, function (result) {
                if (result) {
                    this.$('.ui-icon-question-sign').
                        addClass('ui-icon-ok').removeClass('ui-icon-question-sign');
                } else {
                    self.showError("Server API url is not valid or server is not reachable");
                }
            });

            return false;
        },
        saveUserData: function (ev) {
            ev.preventDefault();

            if (ev.currentTarget.id == 'test-server') return false;

            var data = _.reduce(this.$('#settings-form').serializeArray(), function (settings, field) {
                settings[field.name] = field.value;
                return settings;
            }, {});

            var player = new PlayerModel(data);

            if (player.isValid()) {
                this.trigger('settings:save', player);
            } else {
                this.showError("User data is invalid, need to fill all fields.");
            }
        }

    });

    return DashboardPage;
});
