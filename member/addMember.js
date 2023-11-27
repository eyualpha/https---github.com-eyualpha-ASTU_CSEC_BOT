const addUser = require("../Admin/addUser");

const addMember = (ctx) => {
  const userInput = ctx.message.text;
  const [newUserName, newUserEmail, newUserPhone] = userInput.split(",");
  try {
    addUser(newUserName, newUserEmail, newUserPhone);
    ctx.reply(`${newUserName} added successfuly`);
  } catch (e) {
    console.log(e);
    ctx.reply(`incorrect format! try again`);
  }
};

module.exports = addMember;
