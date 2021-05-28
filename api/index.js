var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');
const cls_model = require('./sdk/cls_model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1781217246:AAFHYFBOPzB5DGgqgPVXUotACNdQxRWQ_5I'
const bot = new TelegramBot(token, {polling: true});


// Main Menu Bot
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});

// input requires i and r
state = 0;
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai i|v contohnya 9|9`
    );   
    state = 1;
});

bot.on('message', (msg) => {
    if(state == 1){
        s = msg.text.split("|");
        i = parseFloat(s[0])
        r = parseFloat(s[1])

        model.predict(
            [
                i, // string to float
                r
            ]
        ).then((jres1)=>{
            cls_model.predict(
                [
                    i, // string to float
                    r,
                    parseFloat(jres1[0]),
                    parseFloat(jres1[1])
                ]
            ).then((jres2)=>{
                bot.sendMessage(
                    msg.chat.id,
                    `nilai v yang diprediksi adalah ${jres1[0]} volt`
                ); 
                bot.sendMessage(
                    msg.chat.id,
                    `nilai p yang diprediksi adalah ${jres1[1]} watt`
                ); 
                bot.sendMessage(
                    msg.chat.id,
                    `Klasifikasi Tegangan :  ${jres2}`
                );
            })
        })
    }else{
        state = 0 
    }
})

// routers
r.get('/predict/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

// routers
r.get('/classify/:i/:r', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.i), // string to float
            parseFloat(req.params.r)
        ]
    ).then((jres1)=>{
        cls_model.predict(
            [
                parseFloat(req.params.i), // string to float
                parseFloat(req.params.r),
                parseFloat(jres1[0]),
                parseFloat(jres1[1])
            ]
        ).then((jres2)=>{
            res.json(jres2)
        })
    })
});

module.exports = r;
