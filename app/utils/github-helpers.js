var axios = require('axios');

var id = 'CLIENT_ID';
var sec = 'SECRET';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username){
    return axios.get('https://api.github.com/users/' + username);
};

var helpers = {
    getPlayersInfo : function(players){
        return axios.all(players.map(function(username){
            return getUserInfo(username);
        })).then(function(response){
            return response.map(function(user){
                return user.data;
            });
        }).catch(function(error){
            console.warn('Error in getPlayersInfo', error);
        });
    }
};

module.exports = helpers;
