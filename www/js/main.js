// Require.js allows us to configure shortcut alias
// Their usage will become more apparent further along in the tutorial.
require.config({
    paths: {
        // Major libraries
        jquery: 'libs/jquery/jquery',
        jqm: 'libs/jquery/jquery.mobile',
        jqmc: 'libs/jquery/jquery.mobile.config', // jquery mobile configuration
        jqmn: 'libs/jquery/jqmNavigator',
        underscore: 'libs/underscore/underscore-amd', // https://github.com/amdjs
        lodash: 'libs/lodash/lodash', // alternative to underscore
        backbone: 'libs/backbone/backbone-amd', // https://github.com/amdjs
        mustache: 'libs/mustache/mustache', // template engine

        // Require.js plugins
        text: 'libs/require/text',
        domr: 'libs/require/domready',

        // Cordova resources
        cordova: '../cordova',
        app: 'libs/cordova/app',

        // Just a short cut so we can put our html outside the js dir
        // When you have HTML/CSS designers this aids in keeping them out of the js directory
        templates: '../templates',
        // Base view for the project
        baseview: 'views/BaseView' // base view for this project
    }
});

// Let's kick off the application

require([
    'views/app',
    'router',
    'vm',
    'app',
    'cordova',
    'jquery', 'jqm', 'jqmc', 'jqmn'
], function (AppView, Router, Vm, CordovaApp) {
    var appView = Vm.create({}, 'AppView', AppView);
    appView.render();

    Router.initialize({appView: appView});  // The router now has a copy of all main app view

    // initialize cordova application
    CordovaApp.initialize();
});
