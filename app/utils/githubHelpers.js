var axios = require('axios');

var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRET_ID';
var param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username){
    return axios.get('https://api.github.com/users/' + username);
};

function getRepos(username){
    // fetch user's repos
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos){
    // reduce repos and to a total of all the stars the user has
    return repos.data.reduce(function(accumulator, current){
        return accumulator + current.stargazers_count;
    }, 0);
}

function getPlayersData(player){
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function(totalStars){
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores(players){
    // return array after calculations
    return [
        (players[0].followers * 3) + players[0].totalStars,
        (players[1].followers * 3) + players[1].totalStars
    ];
}


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
    },
    battle: function(players){
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function(error){console.warn('Error in battle(): ', err)})
    }
};

module.exports = helpers;
