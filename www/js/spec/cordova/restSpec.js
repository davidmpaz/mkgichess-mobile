// Use this as a quick template for future modules
define([
    'sinon',
    'libs/cordova/restclient',
    'mockOptions',
    'jasmineSinon'
], function (sinon, RestClient, MockOptions) {

    var self = this;

    beforeEach(function () {
        self.server = sinon.fakeServer.create();
    });

    afterEach(function () {
        self.server.restore();
    });

    describe('The Rest Client component', function () {
        var player,
            options = MockOptions.gnu_robot_1,
            ranking = MockOptions.ranking;

        describe('For getting a player', function () {

            var callback = sinon.spy();

            it('should make a FAKE REST request to get a player', function () {

                self.server.respondWith('GET', options.server + '/user/' + options.identifier,
                    [200, { "Content-Type": "application/json" }, JSON.stringify(options)]);

                RestClient.getPlayer(options, callback);
                self.server.respond();

                // must be make one request
                expect(self.server.requests.length).toBe(1);
                // with proper REST end point
                expect(self.server.requests[0].url).toBe(options.server + '/user/' + options.identifier);
                // using get method
                expect(self.server.requests[0].method).toBe('GET');
            });

            it('and the callback should be called with returned player data', function () {
                // return function with player data, jasmine-sinon is not working here,
                // need to figure it out why can not be called: toHaveBeenCalledWith()
                expect(callback.calledWith(options));
            });

            it('should make a REAL REST request to get a player', function () {

                var callback = sinon.spy();

                runs(function () {
                    spyOn(RestClient, 'getPlayer').andCallThrough();
                    RestClient.getPlayer(options, callback);
                });

                waitsFor(function () {
                    return (RestClient.getPlayer.calls.length > 0);
                }, "getPlayer should be called", 750);

                runs(function () {
                    expect(RestClient.getPlayer).toHaveBeenCalled();
                    expect(RestClient.getPlayer).toHaveBeenCalledWith(options, callback);
                    expect(callback.calledWith(options)).toBeFalsy();
                });
            });

        });

        describe('For getting player ranking list', function () {

            var callback = sinon.spy();

            it('should make a FAKE REST request to get the ranking', function () {

                self.server.respondWith('GET', options.server + '/user/ranking',
                    [200, { "Content-Type": "application/json" }, JSON.stringify(ranking)]);

                RestClient.getRankingPlayers(options, callback);
                self.server.respond();

                // must be make one request
                expect(self.server.requests.length).toBe(1);
                // with proper REST end point
                expect(self.server.requests[0].url).toBe(options.server + '/user/ranking');
                // using get method
                expect(self.server.requests[0].method).toBe('GET');
            });

            it('and the callback should be called with returned player ranking', function () {
                // return function with player data, jasmine-sinon is not working here,
                // need to figure it out why can not be called: toHaveBeenCalledWith()
                expect(callback.calledWith(ranking));
            });

            it('should make a REAL REST request to get the ranking', function () {

                var callback = sinon.spy();

                runs(function () {
                    spyOn(RestClient, 'getRankingPlayers').andCallThrough();
                    RestClient.getRankingPlayers(options, callback);
                });

                waitsFor(function () {
                    return (RestClient.getRankingPlayers.calls.length > 0);
                }, "getRankingPlayers should be called", 750);

                runs(function () {
                    expect(RestClient.getRankingPlayers).toHaveBeenCalled();
                    expect(RestClient.getRankingPlayers).toHaveBeenCalledWith(options, callback);
                    expect(callback.calledWith(ranking)).toBeFalsy();
                });
            });

        });

        describe('For pinging chess server', function () {

            var callback = sinon.spy();

            it('should make a FAKE REST request to ping server', function () {

                self.server.respondWith('GET', options.server + '/user/ping',
                    [200, { "Content-Type": "application/json" }, "true"]);

                RestClient.testServer(options, callback);
                self.server.respond();

                // must be make one request
                expect(self.server.requests.length).toBe(1);
                // with proper REST end point
                expect(self.server.requests[0].url).toBe(options.server + '/user/ping');
                // using get method
                expect(self.server.requests[0].method).toBe('GET');
            });

            it('and the callback should be called with true', function () {
                // return function with player data, jasmine-sinon is not working here,
                // need to figure it out why can not be called: toHaveBeenCalledWith()
                expect(callback.calledWith(true));
            });

            it('should make a REAL REST request to ping the server', function () {

                var callback = sinon.spy();

                runs(function () {
                    spyOn(RestClient, 'testServer').andCallThrough();
                    RestClient.testServer(options, callback);
                });

                waitsFor(function () {
                    return (RestClient.testServer.calls.length > 0);
                }, "testServer should be called", 750);

                runs(function () {
                    expect(RestClient.testServer).toHaveBeenCalled();
                    expect(RestClient.testServer).toHaveBeenCalledWith(options, callback);
                    expect(callback.calledWith(true)).toBeFalsy();
                });
            });

        });
    });

});
