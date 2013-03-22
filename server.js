var express = require("express")
var port    = 8001
var scrape = require("./scrape.js")

var app = express.createServer()

app.get("/", function(req, rsp){
  rsp.send("welcome to the mtg card api\n")
})

app.get("/:cardnum?", function(req, rsp) {
    scrape.card(req.params.cardnum, function(card){
        if(card){
            var body = JSON.stringify(card, null, 2) + "\n"
            rsp.send(body, {"Content-Type": "application/json"})
        } else {
            rsp.send("card not found\n", 404)
        }
    })
})

app.get("*", function(req, rsp){
  rsp.send("not found\n", 404)
})

app.listen(port)
console.log("listening on port", port)