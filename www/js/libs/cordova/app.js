
define([
    'jquery',
    'libs/cordova/datastore'
], function ($, store) {

    var CordovaApp = {
        store: store,
        user_settings: undefined,

        // Application Constructor
        initialize: function () {
            this.loadSettings();

            this.store.initialize();
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
        // function, we must explicity call 'CordovaApp.receivedEvent(...);'
        onDeviceReady: function () {
            // do cordova stuff here
            document.addEventListener("menubutton", CordovaApp.onMenuPressed, false);
        },
        onMenuPressed: function () {
            $( "#more-menu-btn" ).click();
        },
        saveSettings: function(settings){
            window.localStorage.setItem('settings', window.JSON.stringify(settings));
        },
        loadSettings: function(){
            this.user_settings = window.JSON.parse(window.localStorage.getItem("settings"));

            // set some defaults
            if(typeof this.user_settings === 'undefined' || this.user_settings === null){
                this.user_settings = {username: '', password: '', gender: 'm', age: 10};
            }

            return this.user_settings;
        }
    };


    return CordovaApp;
});
