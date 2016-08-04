var React = require('react');

function puke(object){
    return <pre>{JSON.stringify(object, null, ' ')}</pre>
}

function ConfirmBattle(props){
    return props.isLoading
        ? <p>Loading</p>
        : <div>Confirm battle! {puke(props)} </div>
}

module.exports = ConfirmBattle;
