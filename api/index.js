var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5094739943:AAGfQPWdyjbiL5xLMfnXjO8OgqaPlGf6HRk'
const bot = new TelegramBot(token, {polling: true});

state = 0
// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hallo ! ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
});
// input requires x1 , x2 dan x3
state = 0;
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `Masukan nilai x1|x2|x3 contohnya 8|8|8`
    );
    state = 1;
});

bot.on('message', (msg) => {
    if(state == 1){
        s = msg.text.split("|");
        x1 = s[0]
        x2 = s[1]
        x3 = s[2]
        model.predict(
            [ 
                parseFloat(s[0]), // string float
                parseFloat(s[1]),
                parseFloat(s[2])
            ]
        ).then((jres)=>{
            bot.sendmessage(
                msg.chat.id,
                `Nilai y1 yang diprediksi adalah ${jres[0]}`
            );  
            bot.sendmessage(
                msg.chat.id,
                `Nilai y2 yang diprediksi adalah ${jres[1]}`
            );
            bot.sendmessage(
                msg.chat.id,
                `Nilai y3 yang diprediksi adalah ${jres[2]}`
            );
        })
    }else{
        state = 0
    }
})

// routers
r.get('predict/:x1/:x2/:x3', function(req, res, next) {
    model.predict(
        [
            parsefloat(req.params.x1),// string float
            parsefloat(req.params.x2),
            parsefloat(req.params.x3)
        ]    
    ).then((jres)=>{
        res.json(jres);
    })
});
module.exports = r;
