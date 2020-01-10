// imports
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

// setting up express
const app = express();
const port = 3000;

// send index on main page

app.use(express.static('../client/mainpage'));
app.use(express.static('../client/lobbypage'));

let index = path.join(__dirname, '/../index.html');
let lobby = path.join(__dirname, '/../client/lobbypage/lobby.html');

app.get('/', (req, res) => {
    res.sendFile(index);
});

// https://stackoverflow.com/questions/56624471/express-req-body-is-always-empty
// used for getting POST body
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(express.json());


app.post('/create', (req, res) => {
    console.log("Got here");
});

app.listen(port, () => console.log(`example app listing to ${port}`));

var rooms = [];
var users = [];
var codes = [];