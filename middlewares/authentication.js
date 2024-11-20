const {validateToken} = require("../service/authentication.js")
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
       
        const cookieTokenValue = req.cookies[cookieName];

        if (!cookieTokenValue) {
            return next(); 
        }

        try {
            const userPayload = validateToken(cookieTokenValue);
            req.user = userPayload; 
        } catch (error) {
            console.error('Invalid token:', error.message);
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
