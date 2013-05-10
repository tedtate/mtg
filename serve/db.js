var redis  = require("redis")
var scrape    = require("./scrape")
var client = redis.createClient('6379', '127.0.0.1')

exports.card = function(key, debug, cb){
    client.hgetall(key, function(err, reply){
        if (reply && !debug) {
            cb(reply)
        } else {
            scrape.card(key, function(card) {
                client.hmset(key,
                    'cardname', card.cardname,
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