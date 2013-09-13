define([
    'vm',
    'app',
    'jquery',
    'lodash',
    'backbone',
    'models/player',
    'views/dashboard/page',
    'libs/cordova/restclient',
], function (Vm, CordovaApp, $, _, Backbone, PlayerModel, DashboardPage, Rest) {

    var playerController = {

        handleDashboardRoute: function (options) {
            var settings = CordovaApp.user_settings;

            // if not initial page we already saved the data
            if (settings === null && options.initialPage) {
                // got to settings form
                Backbone.history.navigate('settings', {trigger: true});
            } else {
                // get player and view
                var player = new PlayerModel( Rest.getPlayer(settings.username) ),
                    dashboardPage = Vm.create(options.appView, 'DashboardPage', DashboardPage,
                        {model: player});

                // render and make jquery enhance the html
                dashboardPage.enhance();
                // first page rendered
                $.mobile.jqmNavigator.pushView(options.appView, {transition:'none'});

            }
        }
    }

    return playerController;
});
