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
            waitMessage:localStorage.waitMessage,
            gameID: localStorage.pToken,
            userName2:localStorage.opponent,
        };
    }

    componentDidMount() {
        socket.on('connection', () => {
            socket.emit('join', {
                roomCode: localStorage.pToken
            })
        })
        //changed localstorage.isP1 from boolean to integer because boolean was giving strange error.
        if(localStorage.isP1 == 0){
            socket.on('secondPlayerJoined', (data) => {
                console.log('second player has joined')
                this.setState({
                    userName2: data.p2Name,
                    waitMessage:"The match is currently loading! The AI's are duking it out."
                });
                socket.emit('runTicTac', {
                    roomCode: localStorage.pToken
                });
            });
        }
        else{
            socket.emit('secondPlayerLoaded', {
                roomCode: localStorage.pToken,
                username: localStorage.userName
            })
        }

        socket.on('displayGame', (data)=>{
            // alert('show data')
            localStorage.gameData = data.gameData;
            var i = 0;
            var strg = "";
            for(var prop in data.gameData) {
                console.log('  ' + prop + " : : " + prop.toString() + ' : ' + data.gameData[prop]);
                i++;
                if(i == 3) {
                    strg = data.gameData[prop].toString();
                }
            }
            var tempArray = strg.split(',');
            var s1 = "", s2 = "", s3 = "";
            for(var i = 0; i < 9; i++) {
                if(tempArray[i]=== "0") {
                    if(i < 3) {
                        s1 += "X";
                    }
                    else if( i < 6){
                        s2 += "X";
                    }
                    else {
                        s3 += "X";
                    }
                }
                else if(tempArray[i] === "1") {
                    if(i < 3) {
                        s1 += "O";
                    }
                    else if( i < 6){
                        s2 += "O";
                    }
                    else {
                        s3 += "O";
                    }
                }
                else {
                    if(i < 3) {
                        s1 += " ";
                    }
                    else if( i < 6){
                        s2 += " ";
                    }
                    else {
                        s3 += " ";
                    }
                }
            }
            localStorage.S1 = s1;
            localStorage.S2 = s2;
            localStorage.S3 = s3;
            if(localStorage.isP1 == 0){
                localStorage.yourCode = data.p1Code;
                localStorage.garbageCode = data.p2Code;
            }
            else {
                localStorage.yourCode = data.p2Code;
                localStorage.garbageCode = data.p1Code;
            }
            console.log("Did this run?")
            window.location.replace('/gamePage.html')
        })
    }

    render() {
        return(
            c("div", null, 
                c("h1", {id: "gameTitle"}, "Tic Tack Too"),
                c("div",{id:"gameSquare"},
                    c("h2", null, "Please wait on this page till match begins!"),
                    c("h3", null, this.state.waitMessage),
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