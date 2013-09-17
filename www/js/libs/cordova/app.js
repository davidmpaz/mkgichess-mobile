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
            CordovaApp.loadSettings();
        },
        onMenuPressed: function () {
            $("#more-menu").click();
        },
        saveSettings: function (settings) {
            // check settings values before use JSON
            if(settings !== null && typeof settings !== 'undefined') {
                window.localStorage.setItem('settings', window.JSON.stringify(settings));
            }
        },
        loadSettings: function () {

            var settings = window.localStorage.getItem("settings");

            if(settings !== null){
                settings = window.JSON.parse(settings);
            }

            return settings;
        }
    };


    return CordovaApp;
});
