const Q = require ('q');
var mongo = require('mongoskin');

var db = mongo.db("mongodb://ralihachev:zxcvbnm123@ds163182.mlab.com:63182/emoji", {native_parser: true});
db.bind('emoji');

let services = {};

services.add_emoji = add_emoji;
services.get_emoji = get_emoji;

module.exports = services;


function add_emoji(emoji){
    let deferred = Q.defer();
    db.emoji.insertOne(emoji, function(err, res){
        if (err) {
            deferred.reject();
        }
        else{
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function get_emoji(){
    let deferred = Q.defer();

    db.emoji.find({}).toArray(function(err, emojies){
        if (err){
            deferred.reject()
        } else {
            deferred.resolve(emojies)
        }
    });

    return deferred.promise;
}
