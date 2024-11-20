const JWT = require("jsonwebtoken");
const User = require("../models/user.models");
const secret = "Aman@fghlbbebibbfbdkfbjibou444bkfkjf"

function createTokenForUser(user){
    const payload = {
      _id: user._id,
      email:user.email,
      profileImageUrl:user.profileImageUrl,
      role: user.role,
    };
    const token = JWT.sign(payload,secret)
    return token
}

function ValidateToken(token){
        const payload = JWT.verify(token, secret);
        return payload;
}


module.exports = {
    createTokenForUser,
    ValidateToken
}