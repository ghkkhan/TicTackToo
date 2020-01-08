//god knows what this means
'use strict';

//a handy shortcut. get used to it.
const c = React.createElement;

class GameRoom extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            endpoint: "localhost:8080",
            board:[["","",""],["","",""],["","",""]],
        }
    }

    render() {
        return(
        c("div", null,
            c("div", {className: "row"},
                c("div", {className: "square"},c("p", null, "WUT ")),
                c("div", {className: "square"},c("p", null, "WUT ")),
                c("div", {className: "square"},c("p", null, "WUT")),
            ),
            c("br", null),
            c("div", {className: "row"},
                c("div", {className: "square"},c("p", null, "WUT ")),
                c("div", {className: "square"},c("p", null, "WUT ")),
                c("div", {className: "square"},c("p", null, "WUT")),
            ),
            c("br", null),
            c("div", {className: "row"},
                c("div", {className: "square"},c("p", null, "WUT ")),
                c("div", {className: "square"},c("p", null, "WUT")),
                c("div", {className: "square"},c("p", null, "WUT")),
            ),
        )
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(c(GameRoom),domContainer);