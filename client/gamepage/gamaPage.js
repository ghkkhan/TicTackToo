//god knows what this means
'use strict';

//a handy shortcut. get used to it.
const c = React.createElement;

class GameRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            endpoint: "localhost:8080",
            board:[["X","O","O"],["O","X","O"],["X","O","X"]],
            player1Code: ``,
            player2Code: ""
        }
    }
    render(){
        return(
            c("div",{id:"main"},
                c("h1", {id: "gameTitle"}, "Tic Tack Too"),
                //below is code for displaying the player 1 code...
                c("div",{className:"code"}, 
                    c("textarea", {className:"textBoxes", readonly:"readonly"}, `
import test;\n
    wut?
    reutrn 4fawjofwaefhiauwheflaeihfli hli hualwie hailwehfu aluiwefiuhaweiufhawiuefh lawhf ilfwh iu;
end code </>`),
                ),
                //below is code for displaying the board
                c("div", {id: "board"},
                    c("div", {className: "row"},
                        c("div", {className: "square", id:"topLeft"},c("p", null, this.state.board[0][0])),
                        c("div", {className: "square",id:"topMid"},c("p", null, this.state.board[0][1])),
                        c("div", {className: "square", id:"topRight"},c("p", null, this.state.board[0][2])),
                    ),
                    c("br", null),
                    c("div", {className: "row"},
                        c("div", {className: "square", id:"midLeft"},c("p", null, this.state.board[1][0])),
                        c("div", {className: "square"},c("p", null, this.state.board[1][1])),
                        c("div", {className: "square", id:"midRight"},c("p", null, this.state.board[1][2])),
                    ),
                    c("br", null),
                    c("div", {className: "row"},
                        c("div", {className: "square", id:"botLeft"},c("p", null, this.state.board[2][0])),
                        c("div", {className: "square", id:"botMid"},c("p", null, this.state.board[2][1])),
                        c("div", {className: "square", id:"botRight"},c("p", null, this.state.board[2][2])),
                    )
                ),
                //below is code for displaying the player 2's code.
                c("div",{className:"code"}, 
                    c("textarea", {className:"textBoxes", readonly:"readonly"}, `
import test;
    wut?
    reutrn 4;awjofwaefhiauwheflaeihfli hli hualwie hailwehfu aluiwefiuhaweiufhawiuefh lawhf ilfwh iu;
end code </>`),
                ),
            )
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(c(GameRoom),domContainer);