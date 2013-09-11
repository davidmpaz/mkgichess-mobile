/**
 * Put here jq mobile configuration options
 */
define([
    'jquery',
    'jqm'
], function ($) {
    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
    $.mobile.ajaxEnabled = false;

    // Allow jQuery to make cross domain requests
    $.mobile.allowCrossDomainPages = true;

    // disabled also on router, although lets being redundant
    $.mobile.pushStateEnabled = false;

});
