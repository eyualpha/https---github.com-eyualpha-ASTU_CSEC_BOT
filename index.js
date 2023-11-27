const {Telegraf} = require('telegraf');
const mongoose = require('mongoose');
const Member = require('./Schmas//memberSchma');
const Event = require('./Schmas//eventSchma');

const bot = new Telegraf('6746282011:AAF-MOoNuBALmS3aMQGq4DAkz6HeUehpexQ');
mongoose.connect("mongodb://localhost:27017/Database", { useNewUrlParser: true, useUnifiedTopology: true });

////////////////////////////////////////////start of the bot

const startBot = (ctx)=>{
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
const getSenderName = (ctx)=>{
    const sender = ctx.message.from;
    const senderName = sender.first_name;
    ctx.reply(`👋 Hello ${senderName}!`);
}
bot.start((ctx)=>{
    getSenderName(ctx);
    startBot(ctx);
});

bot.help(async(ctx) => {
    await ctx.reply(`
    Help
    
    click /start to start the bot
    click /administrator to log as administrator
    click /member to log as member

    thanks for using our bot!
    for more info: https://t.me/CSEC_ASTU

    `);
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

const startMemberManager = (ctx) =>{
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 Member Manager',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'➕ Add Members',callback_data:'addMember'}],
                [{text:'❌ Delete Member',callback_data:'deleteMember'}],
                [{text:'⬅️ Back',callback_data:'administratorApproved'}]          
            ]
        }
    })
}

const adminBack = (ctx)=>{
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 What You Want To Do?',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'⚙️ Manage Members',callback_data:'manageMember'}],
                [{text:'🎇 Manage Events',callback_data:'manageEvent'}],
                [{text:'📈 View Members Report',callback_data:'ViewReport'}],
                [{text:'🔳 Log Out',callback_data:'backToStart'}]           
            ]
        }
    })
}
bot.action('administratorApproved',(ctx)=>{ 
    ctx.deleteMessage();
    adminBack(ctx);   
});
//calling to member manager function
bot.action('manageMember',(ctx)=>{ 
    ctx.deleteMessage();
    startMemberManager(ctx);  
});

const  addUser = async(NAME, EMAIL, PHONE)=> {
    try{
        const user = await Member.create({name:NAME, email:EMAIL, phone:PHONE});
        console.log('member added successfuly!')
        }catch{
            console.log('error ocurd!')
            
        }
    };

//calling to add member function
bot.action('addMember',(ctx)=>{
    ctx.reply('🤖 Please Enter New Member Details In Format of name,email,phone:');
    bot.on('text', (ctx) => {   

        console.log('it is working')    
        const userInput = ctx.message.text; 
        const [newUserName, newUserEmail, newUserPhone] = userInput.split(',');
        try {
        addUser(newUserName, newUserEmail, newUserPhone );
        ctx.reply(`${newUserName} added successfuly`);
        }
        catch(e) {
        console.log(e);
        ctx.reply(`incorrect format! try again`);
    }
        startAdminstrator(ctx);
      })
});

// a function that delete memebr using phone number
bot.action('deleteMember',async(ctx)=>{
try {
    const members = await Member.find();
    members.forEach((member) => {
      ctx.reply(`name: ${member.name}\nemail: ${member.email}\nphone: ${member.phone}`)           
    });
  } catch (error) {
    console.log({ message: error.message });
  }

  ctx.reply('🤖 Please Enter The Phone of The Person You Want To Delete From The Above: ')
  bot.on('text',async(ctx) =>{
    const idPhone = ctx.message.text;
    try {
        const result = await Member.findOneAndDelete({ phone: idPhone });
    
        if (result) {
          console.log({ message: 'Member deleted successfully' });
          ctx.reply('Member deleted successfully');
        } else {
          console.log({ message: 'Member not found' });
          ctx.reply('Member not found');
        }
      } catch (error) {
        console.error({ message: 'Error deleting member:'});
        ctx.reply('An error occurred while deleting the member.');
      }   
  })
});

const startEventManager = (ctx) =>{
    ctx.telegram.sendMessage(
        ctx.chat.id,
        '🤖 Event Manager',
    {
        reply_markup: {  inline_keyboard:[
                [{text:'➕ Add Event',callback_data:'addEvent'}],
                [{text:'❌ Delete Event',callback_data:'deleteEvent'}],
                [{text:'⬅️ Back',callback_data:'administratorApproved'}]          
            ]
        }
    })
}

//calling for event manager function
bot.action('manageEvent',(ctx)=>{
    ctx.deleteMessage();
    startEventManager(ctx);
    
});

bot.action('addEvent',async(ctx)=>{
    ctx.reply('🤖 Please Enter events in format of topic,detail:')
    bot.on('text', async(ctx) => {       
        const eventInput = ctx.message.text;
        const [newTopic,newDetail,] = eventInput.split(',');
        try{
            const event = await Event.create({topic: newTopic, detail: newDetail});
            console.log('event added successfuly!')
            }catch{
                console.log('error ocurd!')
            }
        ctx.reply(`event added successfuly!`)
      })
return;
    });
    
bot.action('deleteEvent',async(ctx)=>{
    ctx.reply('the bot is deleting events')
    try {
        const events = await Event.find();
        events.forEach((event) => {
          ctx.reply(`Topic: ${event.topic}\nDetail: ${event.detail}`)           
        });
      } catch (error) {
        console.log({ message: error.message });
      }

      ctx.reply('🤖 Please Enter The Topic of The Event You Want To Delete From The Above: ')
      bot.on('text',async(ctx) =>{
        const eventTopic = ctx.message.text;
        try {
            const result = await Event.findOneAndDelete({ topic: eventTopic });
        
            if (result) {
              console.log({ message: 'Event deleted successfully' });
              ctx.reply('Evebt deleted successfully');
            } else {
              console.log({ message: 'Event not found' });
              ctx.reply('Event not found');
            }
          } catch (error) {
            console.error({ message: 'Error deleting event:'});
            ctx.reply('An error occurred while deleting the .');
          }   
      })

    });

bot.action('ViewReport',async (ctx)=>{
    ctx.reply('Official Members in CSEC_ASTU Are Listed Below:')
    try {
        const members = await Member.find();
        members.forEach((member) => {
          ctx.reply(`name: ${member.name}\nemail: ${member.email}\nphone: ${member.phone}`)
                          
        });
      } catch (error) {
        console.log({ message: error.message });
      }

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
                [{text:'⬅️ Back',callback_data:'backToStart'}]              
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
bot.action('viewEvent',async(ctx)=>{
    ctx.reply('🤖 Available Events At CSEC_ASTU Are Listed Below:')
    try {
        const events = await Event.find();
        events.forEach((event) => {
          ctx.reply(`Topic:  ${event.topic}\nDetail:  ${event.detail}\n`)                      
        });
      } catch (error) {
        console.log({ message: error.message });
      }
      startMember(ctx);
});
///////////////////////////////////////////////////end of members role

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'));




