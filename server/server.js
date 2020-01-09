const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

let index = path.join(__dirname, '/../index.html');
app.use(express.static('../client/mainpage'));
app.use(express.static('../client/lobbypage'));

app.get('/', (req, res) => {
    res.sendFile(index);
});

app.listen(port, () => console.log(`example app listing to ${port}`));

var rooms = [];
var users = [];
var codes = [];

app.post('/test', (req, res) => {
    console.log("printedtest stuff");
    res.send('Hello');
})