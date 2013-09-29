// Use this as a quick template for future modules
define([
    'jquery',
    'underscore',
    'app'
], function ($, _, CordovaApp) {

    function extend(object) {
        return _.extend(this, object);
    };

    /**
     * Push the view with passed options
     *
     * @param View
     * @param options
     */
    function processView(View, options) {
        // ensure navigation, good when browsing from popups
        // to get them closed. transition option is useless here unless you allow
        // same page transition.
        if (typeof options === 'undefined') {
            options = {
                transition: 'pop',
                allowSamePageTransition: true
            };
        } else {
            // this is a must and it is overwritten even if developer pass it as option
            options.allowSamePageTransition = true;
        }

        $.mobile.jqmNavigator.pushView(View, options);
    };

    function checkSettings() {
        var settings = CordovaApp.loadSettings();

        // if not initial page we already saved the data
        if (settings == null) {
            // got to settings form
            Backbone.history.navigate('#/settings');
            return false;
        }

        return settings;
    };

    return {
        extend: extend,
        processView: processView,
        checkSettings: checkSettings
    };
});
