const {Telegraf} = require('telegraf');
const mongoose = require('mongoose');
const Member = require('./Schmas//memberSchma');

const bot = new Telegraf('6746282011:AAF-MOoNuBALmS3aMQGq4DAkz6HeUehpexQ');
mongoose.connect("mongodb://localhost:27017/Database", { useNewUrlParser: true, useUnifiedTopology: true });

////////////////////////////////////////////start of the bot
function startBot(ctx){
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `✨✨Welcome To CSEC_ASTU_Bot✨✨\n\n 👨‍💻 Please Login As:`,
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
const startAdminstrator = (ctx)=>{
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

const  addUser = async(NAME, EMAIL, PHONE, PASSWORD)=> {
    try{
        const user = await Member.create({name:NAME, email:EMAIL, phone:PHONE, password:PASSWORD});
        console.log(user)
        }catch{
            console.log('error')
        }
    };
bot.action('addMemeber',(ctx)=>{
    ctx.reply('please enter new member details in format of name,email,phone,password:');
    bot.on('text', (ctx) => {       
        userInput = ctx.message.text; 
        const [newUserName, newUserEmail, newUserPhone, newUserPassword] = userInput.split(',');
        addUser(newUserName, newUserEmail, newUserPhone,newUserPassword);
        ctx.reply(`${newUserName} added successfuly`);
      })
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
    ctx.reply('Enter events:')
    bot.on('text', (ctx) => {       
        userInput = ctx.message.text;            
        ctx.reply(`Received: ${userInput}`);
      })
    });
    
bot.action('deleteEvent',(ctx)=>{
    ctx.reply('the bot is deleting events')
    });

bot.action('ViewReport',(ctx)=>{
ctx.reply('the bot is loading reports')
S.getAll()
});
////////////////////////////////////////////end of adminstrator role
////////////////////////////////////////////start of members role

const startMember = (ctx)=>{
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