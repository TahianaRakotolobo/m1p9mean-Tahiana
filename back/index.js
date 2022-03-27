var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
    res.setHeader('content-type', 'text/plain');
    res.send(404, 'Page introuvable !');
    // res.status(404).render('404.jade');
    next();
});

app.listen(3000, function(){
    console.log('Server running at http://'+ hostname + ':' + port + '/');
});

app.get('/', function(req, res){
    // res.send('Hello World');
    // res.sendFile(__dirname + '/index.html');
    console.log("request on /");
});

app.get('/liste', function(req, res){
    console.log("request on /liste");
});

app.post('/form', function(req, res){
    console.log(req.body);
});

const connectionString = 'mongodb+srv://ekaly:mdpEkaly214@cluster0.rrybw.mongodb.net/m1p9mean-Tahiana?retryWrites=true&w=majority';

mongoClient.connect(connectionString, {
    useUnifiedTopology: true
    }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to Database');
});
