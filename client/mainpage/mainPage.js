//god knows what this means
'use strict';

//a handy shortcut. get used to it.
const c = React.createElement;

class MainPager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        endpoint: "localhost:3000",
        player1UserName: "",
        player2UserName: "",
        gameID: ""
        };
    }
  //next up are some setters for the states... should be 3 of 'em
    HandlePlayer1Input = (e) => {
        this.setState({
            player1UserName: e.target.value,
        });
    }
    HandlePlayer2Inputs = (e) => {
        this.setState({
            player2UserName: e.target.value,
        });
    }
    HandlePlayer2MatchID = (e) => {
        this.setState({
            gameID: e.target.value,
        });
    }

    //below will be some event handlers for the buttons. should be two of them.
    createGame = (e) => {
        e.preventDefault();
        if(this.state.player1UserName != "") {
            // createGameScript(this.state.HandlePlayer1Input);
            let Url = 'http://localhost:3000/test';
            let data = {};
            $.post(Url, data, function(data, status) {
                console.log("data"+data);
            })
        }
        else {
            alert("You forgot to enter a username, dummy!");
        }
    }
    joinGame = (e) => {
        e.preventDefault();
        if(this.state.player2UserName != "" && this.state.gameID != "") {
            // joinGameScript(this.state.HandlePlayer2Inputs, this.state.HandlePlayer2MatchID);
        }
        else {
            alert("You forgot to enter important data somewhere...");
        }
    }

    // toLobby = (e) => {
    //     e.preventDefault();
    //     window.location.replace('/lobby.html');
    // }

    //react stuff. looks pretty disgusting but Babel doesn't work for me...
    render() {
        return (
            c("div", null,
                c("h1", {id: "gameTitle"}, "Tic Tack Too"),
                c("div",{id:"gameSquare"},
                    c("h3",{className:"gameText"},"Enter your name, Challenger!"),
                    c("input", {type:"text", onChange:this.HandlePlayer1Input, className:"dataForm", placeholder:"Enter UserName here", name:"P1Usr_Nme"}),
                    c("button",{id:"createGameButton", className:"dataForm", onClick: this.createGame},"Start"),
                    c("hr",null),
                    c("h3",{className:"gameText"},"Enter your here if you have a Match ID"),
                    c("input", {type:"text", onChange:this.HandlePlayer2Inputs, className:"dataForm", placeholder: "Enter UserName here", name:"P2Usr_Nme"}),
                    c("input", {type:"password", onChange:this.HandlePlayer2Inputs, className:"dataForm", placeholder: "Enter Code Here", name:"P2Mch_ID"}),
                    c("button",{id:"joinGameButton", className:"dataForm", onClick: this.joinGame}, "Match ID"),
                    c("button", {onClick: this.toLobby}, "skipToLobby"),
                ),
                
            )
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(c(MainPager), domContainer);