define([
    'vm',
    'app',
    'jquery',
    'models/player',
    'libs/cordova/restclient',
    'views/dashboard/page',
    'views/player/profile',
], function (Vm, CordovaApp, $, PlayerModel, Rest, DashboardPage, ProfilePage) {

    return {

        handleDashboardRoute: function (options) {
            var settings = CordovaApp.user_settings;

            // if not initial page we already saved the data
            if (settings === null && options.initialPage) {
                // got to settings form
                Backbone.history.navigate('settings', {trigger: true});
            } else {
                // get player and view
                var player = new PlayerModel(Rest.getPlayer(settings.username)),
                    dashboardPage = Vm.create(options.appView, 'DashboardPage', DashboardPage,
                        {model: player});

                // render and make jquery enhance the html
                dashboardPage.enhance();
                // first page rendered
                $.mobile.jqmNavigator.pushView(options.appView, {transition: 'none'});

            }
        },
        handleProfileRoute: function (options) {
            // get player and view
            var settings = CordovaApp.user_settings,
                player = new PlayerModel(Rest.getPlayer(settings.username)),
                profilePage = Vm.create(options.appView, 'ProfilePage', ProfilePage,
                    {model: player});

            // render and make jquery enhance the html
            profilePage.enhance();
        }
    };
});
