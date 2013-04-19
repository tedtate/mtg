var redis  = require("redis")
var scrape    = require("./scrape")
var client = redis.createClient('6379', '127.0.0.1')

exports.card = function(key, cb){
    client.hgetall(key, function(err, reply){
        if (reply) {
            cb(reply)
        } else {
            scrape.card(key, function(card) {
                client.hmset(key, 'cardname', card.cardname, 'cmc', card.cmc, 'type', card.type)xwxw
                cb(card)
            })
        }
    })
}