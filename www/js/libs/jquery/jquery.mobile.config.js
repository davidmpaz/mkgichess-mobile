/**
 * Put here jq mobile configuration options
 */
define(['jquery', 'jqm'], function ($) {
    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
});