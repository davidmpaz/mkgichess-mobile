define([
    'jquery',
    'libs/cordova/datastore'
], function ($, DataStore) {

    var CordovaApp = {
        store: DataStore,
        user_settings: undefined,

        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'CordovaApp.receivedEvent(...);'
        onDeviceReady: function () {
            // do cordova stuff here
            document.addEventListener("menubutton", CordovaApp.onMenuPressed, false);
            DataStore.loadSettings();
        },
        onMenuPressed: function () {
            $("#more-menu").click();
        }
    };


    return CordovaApp;
});
