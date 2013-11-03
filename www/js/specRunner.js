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
        baseview: 'views/BaseView', // base view for this project

        // spec dependencies
        sinon: 'libs/jasmine/sinon',
        jasmine: 'libs/jasmine/jasmine',
        jasmineHtml: 'libs/jasmine/jasmine-html',
        jasmineSinon: 'libs/jasmine/jasmine-sinon',
        mockOptions: 'spec/mock-options'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        sinon: {
            exports: 'sinon'
        },
        'jasmineHtml': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmineSinon': {
            deps: ['sinon', 'jasmine'],
            exports: 'sinon'
        }
    }
});

require(['jquery', 'jasmineHtml'], function ($, jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/cordova/restSpec');
    specs.push('spec/cordova/cordovaSpec');



    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });

});
