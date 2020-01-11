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
        gameID: "",
        file:"",
        fileName1:"Pick Python File",
        fileName2: "Pick Python File"
        };
    }
  //next up are some setters for the states... should be 5 of 'em
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
    p1FileNameChange = (e) => {
        this.setState({
            fileName1:e.target.value.split('\\').pop()
        });
    }
    p2FileNameChange = (e) => {
        this.setState({
            fileName2:e.target.value.split('\\').pop()
        });
    }

    //below will be some event handlers for the buttons. should be two of them.
    createGame = (e) => {
        e.preventDefault();
        if(this.state.player1UserName != "" && this.state.filename1 != "Pick Python File") {
            let URL = 'http://localhost:3000/create';
            //sending the username and the uploaded file to the server.
            localStorage.userName = this.state.player1UserName;
            let data = {
                username: this.state.player1UserName,
                file: this.state.file
            };
            $.post(URL, data, function(data, status) {
                //data sent to and recieved from the server. going to the 
                console.log("Game is Created. Changing page now.");
                localStorage.pToken = data.roomCode;
                window.location.replace('/lobby.html');
            });
        }
        else {
            alert("You forgot to enter a username, dummy!");
        }
    }
    joinGame = (e) => {
        e.preventDefault();
        if(this.state.player2UserName != "" && this.state.gameID != "" && this.state.filename2 != "Pick Python File") {
            let URL = 'http://localhost:3000/joinGame';
            //sending the data to the server.
            localStorage.userName = this.state.player2UserName;
            localStorage.pToken = this.state.gameID;
            let data = {
                username: this.state.player2UserName,
                gameId: this.state.gameID,
                file:this.state.file,
            }
            $.post(URL, data, function(data, status) {
                console.log("game is being joined. Going to the loading page.");
                window.location.replace('/lobby.html');//this will go to another page later on...
            });

        }
        else {
            alert("You forgot to enter important data somewhere bud!");
        }
    }
    
    // componentDidMount() {
    //     if(localStorage.pToken === null) {
    //         console.log('this player already has a ');
    //     }
    // }

    //react stuff. looks pretty disgusting but Babel doesn't work for me...
    render() {
        return (
            c("div", null,
                c("h1", {id: "gameTitle"}, "Tic Tack Too"),
                c("div",{id:"gameSquare"},
                    c("h3",{className:"gameText"},"Enter your name, Challenger!"),
                    c("h5",{className:"gameText"},"Then select your AI Python Script"),
                    c("input", {type:"text", onChange:this.HandlePlayer1Input, className:"dataForm", placeholder:"Enter username here", name:"P1Usr_Nme"}),
                    c("input",{type:"file", id:"fileAccepter1", className:"fileAccepter", accept:".py", onChange:this.p1FileNameChange}),
                    c("label", {className:"FALabel", htmlFor:"fileAccepter1", id:"p1FileLabel"},
                        c("img", {src:"/python-seeklogo.com.svg", alt:"test", width:"20px",height:"20px", }), 
                        c("span",null, " "+this.state.fileName1)
                    ),
                    c("button",{id:"createGameButton", className:"dataButton", onClick: this.createGame},"Start"),
                    c("hr",null),
                    c("h3",{className:"gameText"},"Enter here if you have a Match ID"),
                    c("h5", {className:"gameText"}, "Also input your python script here."),
                    c("input", {type:"text", onChange:this.HandlePlayer2Inputs, className:"dataForm", placeholder: "Enter UserName here", name:"P2Usr_Nme"}),
                    c("input", {type:"password", onChange:this.HandlePlayer2Inputs, className:"dataForm", placeholder: "Enter Code Here", name:"P2Mch_ID"}),
                    c("input",{type:"file", id:"fileAccepter2", className:"fileAccepter", accept:".py", onChange:this.p2FileNameChange}),
                    c("label", {className:"FALabel", htmlFor:"fileAccepter2", id:"p2FileLabel"},
                        c("img", {src:"/python-seeklogo.com.svg", alt:"test", width:"20px",height:"20px", }), 
                        c("span",null, " " + this.state.fileName2)
                    ),
                    c("br", null),
                    c("button",{id:"joinGameButton", className:"dataButton", onClick: this.joinGame}, "Match ID"),

                ),
            )
        );
    }
}
const domContainer = document.querySelector('#root');
ReactDOM.render(c(MainPager), domContainer);

var input = document.getElementById('fileAccepter1');
var label = document.getElementById('p1FileLabel');