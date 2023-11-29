const Event = require("../Schmas/eventSchma");

const deletEvent = async (ctx) => {
  let eventTopic = ctx.message.text;
  if (eventTopic.startsWith("/")) {
    eventTopic = eventTopic.substring(1);
  }
  try {
    const result = await Event.findOneAndDelete({ topic: eventTopic });

    if (result) {
      console.log({ message: "Event deleted successfully" });
      ctx.reply("Event deleted successfully");
    } else {
      console.log({ message: "Event not found" });
      ctx.reply("Event not found");
    }
  } catch (error) {
    console.error({ message: "Error deleting event:" });
    ctx.reply("An error occurred while deleting the .");
  }
};

module.exports = deletEvent;
