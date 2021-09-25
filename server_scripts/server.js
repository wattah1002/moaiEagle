// var server = require('http').createServer();
const fs = require('fs');
const https = require('https');
var options = {
    cors: true
};

const server = https.createServer({
    cert: fs.readFileSync('./cert.pem'),
    ca: fs.readFileSync('./chain.pem'),
    key: fs.readFileSync('./key.pem')
}, function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end("hello, world.");
});

var io = require('socket.io')(server, options);
var mysql = require('mysql'); // import mysql

let players = {}; // {"socketID": Player情報, "socketID": Player情報, ..}
let boardText="test";
let mainImg;
var connection = mysql.createConnection({ // connect database
    // host: 'localhost',
    host: 'db.cnr7ujyje98h.us-east-1.rds.amazonaws.com', //エンドポイント
    user: 'root',
    password: 'password',
    database: 'db_moaiEagle'
});

// if not connected, you can see the error message.
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// 新しいレコードの挿入(insert)
// connection.query('INSERT INTO tb_room VALUES (1, "sample");', function(error, response){
//     if(error) throw error;
//     console.log(response);
// });

// レコードのカラム値をアップデート(update)
// connection.query(`UPDATE tb_room SET text="${boardText}" WHERE id=1;`, (error, response) => {
//     if(error) throw error;
//     console.log(response);
// });

function Player (id) {
    this.id = id;
    this.name = "No Name"
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.rx = 0;
    this.ry = 180;
    this.rz = 0;
    this.entity = null;
}

// コールバック関数にすると動かない
// let loadText = function() { // add
//     connection.query(`SELECT text FROM tb_room WHERE id=1`, (error, result, fields) => {
//         if(error) throw error;
//         boardText=result[0].text;
//         console.log(boardText);
//     });
// }

io.sockets.on('connection', function(socket) {
    console.log('port 3000 connectioned.');
    socket.on('initialize', function() {
        console.log("--------------connect");
        console.log("connect PlayerID = ", socket.id);
        var idNum = socket.id;
        var newPlayer = new Player (idNum);
        players[idNum] = newPlayer;
        socket.emit('playerData', {id: idNum, players: players});
        socket.broadcast.emit('playerJoined', newPlayer);

        connection.query(`SELECT text FROM tb_room WHERE id=1`, (error, result, fields) => {
            if(error) throw error;
            boardText=result[0].text;
            console.log(boardText);
            socket.emit('loadText', boardText);
            console.log('loadText emitted.');
        });
        // 画像のやりとり
        connection.query(`SELECT img FROM tb_room WHERE id=1`, (error, result, fields) => {
            if(error) throw error;
            mainImg=result[0].img;
            console.log(mainImg);
            socket.emit('loadImg', mainImg);
            console.log('loadImg emitted.');
        });
        // コールバック関数にすると動かない
        // loadText(function(){
            // socket.emit('loadText', boardText);
            // console.log('loadText emitted.');
        // }); //add

        console.log("now Players ↓");
        console.log(players);
    });

    socket.on('positionUpdate', function(data){
        players[data.id].x = data.x;
        players[data.id].y = data.y;
        players[data.id].z = data.z;
        players[data.id].rx = data.rx;
        players[data.id].ry = data.ry;
        players[data.id].rz = data.rz;
        socket.broadcast.emit('playerMoved', data);
    });

    socket.on('broadSetName', function (name) {
        players[socket.id].name = name;
        socket.broadcast.emit ('NameUpdate', {id: socket.id, name: name});
    });

    socket.on('broadTalk', function(data) {
        socket.broadcast.emit('displayMessage', {id: socket.id, message: data});
    });

    socket.on('boardTextUpdate', function(data){
        console.log('boardTextUpdate was received.');
        boardText = data;
        connection.query(`UPDATE tb_room SET text="${boardText}" WHERE id=1;`, (error, result, fields) => {
            if(error) throw error;
            console.log(result);
        });
        socket.broadcast.emit('boardTextChanged', data);
    })

    socket.on('disconnect', ()=>{
        console.log("--------------disconnect");
        console.log("disconnect PlayerID = ", socket.id);
        socket.broadcast.emit('playerLeaved', socket.id);
        delete players[socket.id];

        console.log("now Players ↓");
        console.log(players);
    });

});

console.log('Server started.');
server.listen(3000);
