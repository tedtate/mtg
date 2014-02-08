var scrape = require("./scrape");
var redis;

console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);
} else {
    redis = require('redis').createClient('6379', '127.0.0.1')
}

exports.card = function(key, debug, cb){
    redis.hgetall(key, function(err, reply){
        if (reply && !debug) {
            cb(reply)
        } else {
            scrape.card(key, function(card) {
                redis.hmset(key,
                    'cardname', card.cardname,
                    'cost', card.cost,
                    'cmc', card.cmc,
                    'type', card.type,
                    'power', card.power,
                    'toughness', card.toughness,
                    'rules', card.rules,
                    'flavor', card.flavor,
                    'set', card.set,
                    'rarity', card.rarity,
                    'cardnumber', card.cardnumber,
                    'artist', card.artist)
                cb(card)
            })
        }
    })
}