var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
 
app.set("view options",{layout:false});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port, function() {
    console.log('server is running')
});
