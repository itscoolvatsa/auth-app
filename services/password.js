const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const comparePassword = async (userPassword, providedPassword) => {
    return (validPassword = await bcrypt.compare(
        providedPassword,
        userPassword
    ));
};
module.exports = { hashPassword, comparePassword };
