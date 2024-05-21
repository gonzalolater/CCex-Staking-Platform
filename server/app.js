var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite = require('sqlite3');
var env = require('dotenv').load();
const cors = require('cors');
const expressWs = require('express-ws');
const http = require ('http');
const path = require('path');
const botController = require('./controllers/botController.js');
var port = process.env.PORT || 8080;

// models
var models = require("./models");

// routes
var botRoute = require('./routes/bots');
var settingRoute = require('./routes/setting');
var transactionRoute = require('./routes/transactions');
var tokenRoute = require('./routes/token');


//Sync Database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname,"../build/")));

app.use(cors());

// register routes
app.use('/setting', settingRoute);
app.use('/bots', botRoute);
app.use('/transactions',transactionRoute);
app.use('/tokens',tokenRoute);

// index path
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "../build/index.html"))
});

const server = http.createServer(app);

server.listen(port, function(){
    console.log('app listening on port: '+port);
});

const getUniqueID = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };
  
module.exports.wss = expressWs(app, server);


app.ws("/connect", function(ws, req) {
    var userID = getUniqueID();
    global.wsClients[userID] = ws;
  
    console.log('connected: ' + userID );
  
    ws.on("message", async function(msg) {
      console.log(msg);
    });
  
    // user disconnected
    ws.on("close", function(connection) {
      console.log(new Date() + " Peer " + userID + " disconnected.");
      delete global.wsClients[userID];
    });
  });


global.snipSubscription = null;
global.frontSubscription = null;
global.wsClients = {};

module.exports = app;