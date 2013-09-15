// Use this as a quick template for future modules
define([
    'jquery',
    'underscore'
], function ($, _) {

    function extend (object) {
        return _.extend(this, object);
    };

    function processView (View) {
        // ensure navigation, good when browsing from popups
        // to get them closed. transition option is useless here unless you allow
        // same page transition.
        $.mobile.jqmNavigator.pushView(View, {
            transition: 'pop',
            allowSamePageTransition: true
        });
    };

    return {
        extend: extend,
        processView: processView
    };
});
