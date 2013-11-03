// Use this as a quick template for future modules
define([
    'libs/jasmine/helper',
    'app'
],function (Helper, CordovaApp) {

    describe('The Cordova App Component', function () {
        describe('On initialize', function () {
            it('should bind deviceready', function () {
                runs(function () {
                    spyOn(CordovaApp, 'onDeviceReady');
                    CordovaApp.initialize();
                    Helper.trigger(window.document, 'deviceready');
                });

                waitsFor(function () {
                    return (CordovaApp.onDeviceReady.calls.length > 0);
                }, 'onDeviceReady should be called once', 500);

                runs(function () {
                    expect(CordovaApp.onDeviceReady).toHaveBeenCalled();
                });
            });
        });
    });

});
