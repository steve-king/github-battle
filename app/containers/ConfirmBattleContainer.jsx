var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/github-helpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
            router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        console.log('getInitialState');
        return {
            isLoading: true,
            playersInfo: []
        }
    },
    componentDidMount: function(){
        console.log('componentDidMount');

        var query = this.props.location.query;
        console.log(query);

        // fetch playersInfo from GitHub
        githubHelpers
            .getPlayersInfo([query.playerOne, query.playerTwo])
            .then(function(players){
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                });
            }.bind(this));
    },
    handleInitiateBattle: function(){
        this.context.router.push({
            pathname: '/results',
            state: {
                playerInfo: this.state.playersInfo
            }
        });
    },
    render: function(){
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                playersInfo={this.state.playersInfo}
                onInitiateBattle={this.handleInitiateBattle} />
        );
    }
});

module.exports = ConfirmBattleContainer;
