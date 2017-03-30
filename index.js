var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();
var port = 8080;

app.use('/app', express.static('app'));

app.use( bodyparser.json({     
  limit: '50mb'
}));       
app.use(bodyparser.urlencoded({     
  extended: true, limit: '50mb'
}));

/*app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + '/app/views/login.html'));    
});*/

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/app/views/metacoin.html'));
});

app.listen(port, function() {
  console.log('Node app is running on port', port);
});
