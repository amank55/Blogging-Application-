const { createHmac, randomBytes, Hmac } = require("crypto");
const {Schema, model} = require("mongoose");
const { createTokenForUser } = require("../service/authentication");

const userSchema = new Schema({
    fullname: {
        type: String,
        required : true,
    }, 
    email: {
        type: String,
        required : true,
        unique: true
    },
    salt : {
        type: String,
    },
    password : {
        type: String,
        required : true,
    },
    profileImage: {
        type: String,
        default: "/images/download.png"
    },
    role: {
        type: String,
        enum : ["USER", "ADMIN"],
        default : "USER",
    }

}, 
{timestamps: true}
)
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

userSchema.static("matchPassword", async function(email, password){
    const user =  await this.findOne({email})
    if(!user) throw new Error("User not Found!!");

    const salt = user.salt;
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hashedPassword !== userProvidedHash) throw new Error("Incorrrect Password")
    const token = createTokenForUser(user);
    return token;
})
const User = model ('user', userSchema)
module.exports = User;