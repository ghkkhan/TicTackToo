/*
This page will only be visible to player 1.
The player will recieve an ID here that they may share with their buddies.
They will also turn in their python script here.
if and when a second player uses their ID to login as well, the player will be moved to the final page
*/
'use strict';

const c = React.createElement;

class LobbyPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "localhost:3000",
            userName: "Boomer",
            gameID: "42069",
        };
    }

    render() {
        return(
            c("div", null, 
                c("h1", null, "Here is an ID for your match: "),
                c("h3", null, "Username: " + this.state.userName),
                c("h3", null, "Game ID: " + this.state.gameID),
                c("h3", null, "Send the ID to whomever you want to challenge.\n"),
                c("h3", null, "Choose a python script that you want to use in the competition."),
                c("input",{type:"file", id:"fileAccepter", name:"fileAccepter", accept:".py"}),
            )
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(c(LobbyPager), domContainer);