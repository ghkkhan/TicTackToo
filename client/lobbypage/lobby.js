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
            userName1: localStorage.userName,
            gameID: localStorage.pToken,
            userName2:"Waiting..."
        };
    }

    render() {
        return(
            c("div", null, 
                c("h1", {id: "gameTitle"}, "Tic Tack Too"),
                c("div",{id:"gameSquare"},
                    c("h2", null, "Please wait on this page till match begins!"),
                    c("h3", null, "Send the Game ID to whomever you wish to challenge.\n"),
                    c("hr", null),
                    c("h4", null, "Game ID: " + this.state.gameID),
                    c("h4", null, "Your Username: " + this.state.userName1),
                    c("h4", null, "Oponent's nomer: " + this.state.userName2)

                ),
            )
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(c(LobbyPager), domContainer);