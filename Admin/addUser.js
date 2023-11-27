const addUser = async (NAME, EMAIL, PHONE) => {
  try {
    const user = await Member.create({
      name: NAME,
      email: EMAIL,
      phone: PHONE,
    });
    console.log("member added successfuly!");
  } catch {
    console.log("error ocurd!");
  }
};

module.exports = addUser;
