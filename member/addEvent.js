const Event = require("../Schmas/eventSchma");
const addEvent = async (ctx) => {
  const eventInput = ctx.message.text;
  const [newTopic, newDetail] = eventInput.split(",");
  try {
    const event = await Event.create({ topic: newTopic, detail: newDetail });
    console.log("event added successfuly!");
  } catch {
    console.log("error ocurd!");
  }
  ctx.reply(`event added successfuly!`);
};

module.exports = addEvent;
