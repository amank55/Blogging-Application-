const JWT = require("jsonwebtoken");
const User = require("../models/user.models");
const secret = "Aman@fghlbbebibbfbdkfbjibou444bkfkjf"

function createTokenForUser(user){
    const payload = {
      _id: user._id,
      email:user.email,
      profileImageURL:user.profileImageURL,
      role: user.role,
    };
    const token =  JWT.sign(payload,secret)
    return token
}

try {
    function validateToken(token){
            const payload = JWT.verify(token, secret);
            return payload;
    }  
} catch (error) {
    throw new Error('Invalid or expired token');
}
module.exports = {
    createTokenForUser,
    validateToken,
}