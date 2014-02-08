var express = require("express");
var app = express();
var port = 80
var db = require("./db.js")
var SCRAPE_DEBUG = true

app.get('/', function(req, rsp){
  rsp.send('welcome to the mtg card api\n')
})

app.get("/:cardnum?", function(req, rsp) {
    db.card(req.params.cardnum, SCRAPE_DEBUG, function(card){
        if(card){
            var body = JSON.stringify(card, null, 2) + "\n"
            rsp.send(body)
        } else {
            rsp.send('card not found\n', 404)
        }
    })
})

app.get('*', function(req, rsp){
    rsp.send('not found\n', 404)
})

app.get('/favicon.ico', function(req, rsp) {
    rsp.send('icon!', 404);
})

app.listen(port)
console.log('listening on port', port)