const {Telegraf} = require('telegraf');

const bot = new Telegraf('6746282011:AAF-MOoNuBALmS3aMQGq4DAkz6HeUehpexQ');

////////////////////////////////////////////start of the bot
function startBot(ctx){
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `✨✨Welcome To ASTU_CSEC_Bot✨✨\n\n 👨‍💻 Please Login As:`,
    {
        reply_markup: {  inline_keyboard:[
                [{text:'Member',callback_data:'member'}],
                [{text:'Administrator',callback_data:'administrator'}]               
            ]
        }
    })

}
bot.start((ctx)=>{
    startBot(ctx);
});
bot.action('backToStart',(ctx)=>{
    ctx.deleteMessage();
    startBot(ctx);
})
//////////////////////////////////////////start of adminstrator role
function startAdminstrator(ctx){
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 What You Want To Do?',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'⚙️ Manage Members',callback_data:'manageMemeber'}],
                [{text:'🎇 Manage Events',callback_data:'manageEvent'}],
                [{text:'📈 View Report',callback_data:'ViewReport'}],
                [{text:'🔳 Log Out',callback_data:'backToStart'}]           
            ]
        }
    })

}
bot.action('administrator',(ctx)=>{
    ctx.deleteMessage();
    startAdminstrator(ctx);   
});

bot.action('manageMemeber',(ctx)=>{
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 Member Manager',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'➕ Add Members',callback_data:'addMemeber'}],
                [{text:'❌ Delete Member',callback_data:'deleteMember'}],
                [{text:'⬅️ Back',callback_data:'administrator'}]          
            ]
        }
    })
});

bot.action('addMemeber',(ctx)=>{
ctx.reply('the bot is adding members')
});

bot.action('deleteMember',(ctx)=>{
ctx.reply('the bot is deleting members')
});

bot.action('manageEvent',(ctx)=>{
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 Event Manager',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'➕ Add Event',callback_data:'addEvent'}],
                [{text:'❌ Delete Event',callback_data:'deleteEvent'}],
                [{text:'⬅️ Back',callback_data:'administrator'}]          
            ]
        }
    })
});

bot.action('addEvent',(ctx)=>{
    ctx.reply('the bot is adding events')
    });
    
bot.action('deleteEvent',(ctx)=>{
    ctx.reply('the bot is deleting events')
    });

bot.action('ViewReport',(ctx)=>{
ctx.reply('the bot is loading reports')
});
////////////////////////////////////////////end of adminstrator role
////////////////////////////////////////////start of members role

function startMember(ctx){
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 What You Want To Do?',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'⬆️ Update Profile',callback_data:'updateProfile'}],
                [{text:'📊 View Events',callback_data:'viewEvent'}],
                [{text:'🔳 Log Out',callback_data:'backToStart'}]              
            ]
        }   
    })
}
bot.action('member',(ctx)=>{
    ctx.deleteMessage();
    startMember(ctx);
});


bot.action('updateProfile',(ctx)=>{
ctx.reply('the bot is updating your profile')
});
bot.action('viewEvent',(ctx)=>{
ctx.reply('the bot is loading events for you')
});
///////////////////////////////////////////////////end of members role

bot.launch();