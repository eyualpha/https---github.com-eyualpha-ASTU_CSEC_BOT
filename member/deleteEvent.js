const Event = require("../Schmas/eventSchma");

const deletEvent = async (ctx) => {
  const eventTopic = ctx.message.text;
  try {
    const result = await Event.findOneAndDelete({ topic: eventTopic });

    if (result) {
      console.log({ message: "Event deleted successfully" });
      ctx.reply("Evebt deleted successfully");
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
