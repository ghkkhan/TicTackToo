// imports
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs');

// setting up express
const app = express();
const port = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

// global vars
var rooms = []; // consists of {firstUsername: , secondUsername: , firstBot: , secondBot: , roomCode: }
var roomCount = 0;

// send index on main page

app.use(express.static('../client/mainpage'));
app.use(express.static('../client/lobbypage'));
app.use(express.static('../client/gamepage'));

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

// app.post('/create', (req, res) => {
//     // console.log(req.body)
// 	users.push(req.body.username)
// 	room_and_code.push({
// 		user0: req.body.username,
//         user1: '',
//         roomCode:roomCount,
// 		// room_code: hex_md5(roomCount)//this part was removed because the function isn't defined.
// 	})
// 	data = {
//         // roomCode: hex_md5(roomCount)
//         roomCode: roomCount,
// 	}
// 	roomCount++
//     res.send(data);
//     //res.sendfile(index);

// })
// app.post('/joinGame', (req, res) => {
//     users.push(req.body.username);
//     room_and_code.forEach(function(item, index, array){
//         if(item.roomCode === req.gameId) {
            
//             room_and_code[index].user1 = req.body.username;
//         }
//         data = {
//             p1Name:room_and_code[index].user0
//         }
//         res.send(data);
//     });
// })

//////////////////// SOCKETS!!!!!!!!!
io.sockets.on('connection', (socket) => {
    console.log('connected')
    socket.emit('connection')

    // make sure people rejoin room on refresh/redirect
    socket.on('join', (data)=>{
        if(data.roomCode){
            socket.join(data.roomCode)
            console.log(`user joined room:${data.roomCode}`)
        }
    })

    socket.on('createGame', (data)=>{
        socket.join(roomCount.toString())
        rooms.push({
            firstUsername: data.username,
            secondUsername: null,
            roomCode: roomCount.toString(),
            firstBot: data.file,
            secondBot: null
        })
        socket.emit('createGameResponse', {
            roomCode: roomCount
        })
        roomCount++
        console.log(roomCount)
    })

    socket.on('joinGame', (data)=>{
        try{
            rooms.forEach((room, index)=>{
                console.log(data.roomCode)
                console.log(room.roomCode)
                if(data.roomCode === room.roomCode){
                    // room code found
                    room.secondUsername = data.username // seting the room variables
                    room.secondBot = data.file
                    socket.join(data.roomCode) // join socket room
                    socket.emit('joinGameResponse', {
                        p1Name: room.firstUsername // tell client to redirect and set some variables
                    })
                    
                    throw BreakException;
                }
            })
            socket.emit('canNotJoinRoom')
        }
        catch(e){
            // found a room code that matched
        }
        
    })

    socket.on('secondPlayerLoaded', (data)=>{
        socket.broadcast.to(data.roomCode).emit('secondPlayerJoined', {
            p2Name: data.username // tell owner that second player has joined
        })
    })
    

    socket.on('runTicTac', (data)=>{
        // find the room and then run the two scripts
        try{
            console.log(rooms)
            rooms.forEach((room, index)=>{
                console.log(data.roomCode, room.roomCode)
                if(data.roomCode === room.roomCode){
                    // need to write room.firstBot to bot0.txt and room.secondBot to bot1.txt
                    fs.writeFile('bot0.txt', room.firstBot, 'ascii', ()=>{
                        fs.writeFile('bot1.txt', room.secondBot, 'ascii', ()=>{
                            gameData = runBots(room.roomCode)
                            io.sockets.to(room.roomCode).emit('displayGame', {
                                gameData: gameData
                            })
                            //////////// END OF WORK HERE. PROBABLY NEED TO RETURN THEN SOCKET.EMIT
                        });
                    });
                    throw BreakException;
                }
            })
        }
        catch(e){
            // found the room. something is terribly wrong if we don't get here
        }
    })
    

    socket.on('disconnect', ()=>{
        console.log('disconnected')
    })
})







function runBots(roomCode){
    console.log('run')
	//https://www.geeksforgeeks.org/run-python-script-node-js-using-child-process-spawn-method/
	const spawn = require("child_process").spawn;
    const process = spawn('python',["tictac.py"]);
	//console.log(process)
	
	process.stdout.on('data', function(data) {
        console.log('here')
		console.log(data.toString())
		console.log(JSON.parse(data.toString().replace(/'/g,'"').replace(/None/g,' ').replace(/True/g,'true'))) // replace single quotes with double quotes. replace None with null. replace True with true
        return JSON.parse(data.toString().replace(/'/g,'"').replace(/None/g,' ').replace(/True/g,'true'))
    } ) 
}



app.listen(port, () => console.log(`example app listing to ${port}`));

const server = http.listen(4000, function() {
    console.log('listening on *:4000');
});