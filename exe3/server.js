const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoService = require('./mongo/mongoService');

let port = process.env.PORT || 3000; //port we are listening to

app.use(express.static('public')); // serving static files
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile('index.html', {root: __dirname})
});

app.get('/getEmoji', function(req, res){
    mongoService.get_emoji()
        .then(function(emojies){
            res.send(emojies)
        })
        .catch(function(err){
            res.send(err)
        });
});

app.post('/submitEmoji', function(req, res){
    mongoService.add_emoji(req.body)
        .then(function(){
            res.json({ message: 'Thank you for your emoji' });
        })
        .catch(function(err){
            res.json({ message: 'Error inserting to database' })
        })
});

app.listen(port, function(){
    console.log('App running on port ', port)
});