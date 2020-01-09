// imports
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

// setting up express
const app = express();
const port = 3000;

// send index on main page
let index = path.join(__dirname, '/../index.html');

app.use(express.static('../client/mainpage'));
app.use(express.static('../client/lobbypage'));

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

function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

roomCount = 0

app.post('/create', (req, res) => {
    console.log(req.body)
	users.push(req.body.username)
	room_and_code.push({
		users: [],
		room_code: hex_md5(roomCount)
	})
	data = {
		roomCode: hex_md5(roomCount)
	}
	roomCount++
    res.send(data);
})

app.listen(port, () => console.log(`example app listing to ${port}`));

var room_and_code = []; // consists of {users: [], room_code: aaa}
var users = [];
var codes = [];