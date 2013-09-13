define(function () {

    var mockupdata = {
        games: [
            {
                "game_id": 1,
                "opponent": "some user",
                "your_turn": true,
                "move_count": 12,
                "last_move": "2013-Aug-15 04:15"
            },
            {
                "game_id": 2,
                "opponent": "some other user",
                "your_turn": false,
                "move_count": 17,
                "last_move": "2013-Aug-15 04:15"
            }
        ],
        settings: {
            "username": "davidmpaz",
            "password": "shak123",
            "gender": "m",
            "age": "29",
            "server": "http://chess.uclv.edu.cu"
        },
        players: {
            'davidmpaz': {
                username: 'davidmpaz', password: 'shak123', realname: 'David M. Paz',
                gender: 'm', age: 29, country: 'cu', email: 'dpr@uclv.edu.cu',
                creation_date: '2011-09-20 16:09:09', score_win: 28, score_draw: 0,
                score_losses: 12, score_points: 1402, notification_delay: 'im', is_admin: 1,
                portrait: 'player_portrait.php?player=davidmpaz',
                genderLong: function () { return this.gender == 'm' ? 'Male' : 'Female'; },
                countryLong: 'Cuba',
                score_games: function () {return this.score_win + this.score_draw + this.score_losses}
            }
        }
    };

    return mockupdata;
});