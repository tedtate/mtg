var jsdom  = require('jsdom')
var fs = require('fs')

exports.card = function(num, cb){

    var url = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + num,
        fn = 'saved/' + num + '.html'

    fs.open(fn, 'r', function(err, fd) {
        var html = fn

        if(err === null) {
            html = fd
        }

        jsdom.env(url, ['http://code.jquery.com/jquery.js'], function(err, window){
            if(err) return cb(null)

            var $ = window.$,
                details = $('.cardDetails .smallGreyMono:nth-child(2)'),
                pt = details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_ptRow .value').text().split('/')
            
            card = {
                'cardname': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_nameRow .value').text().trim(),
                'cmc': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_cmcRow .value').text().trim(),
                'type': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_typeRow .value').text().trim(),
                'power': (pt[0] || '').trim(),
                'toughness': (pt[1] || '').trim(),
                'rules': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_textRow .cardtextbox').text().trim(),
                'flavor': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_flavorRow .value').text().trim(),
                'set': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_setRow .value').text().trim(),
                'rarity': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_rarityRow .value').text().trim(),
                'cardnumber': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_numberRow .value').text().trim(),
                'artist': details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_artistRow .value').text().trim()
            }

            cb(card)
        })
    })
}