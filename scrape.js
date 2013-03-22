var jsdom  = require('jsdom')

exports.card = function(num, cb){

  var url = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + num

    jsdom.env(url, ['http://code.jquery.com/jquery.js'], function(err, window){
        if(err) return cb(null)

        var $ = window.$
        var details = $('.cardDetails .smallGreyMono:nth-child(2)')
        
        card = {
            'name':  details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_nameRow .value').text().trim(),
            'cmc':   details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_cmcRow .value').text().trim(),
            'type':   details.find('#ctl00_ctl00_ctl00_MainContent_SubContent_SubContent_typeRow .value').text().trim()
        }

        cb(card)
    })
}