const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user.js")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication.js")
const app = express();
const PORT = 8000

mongoose
.connect("mongodb://localhost:27017/blogify")
.then((e)=> console.log("MongoDb Connected"))
app.set("view engine", 'ejs')
app.set("views", path.resolve("./views/partials"))

app.use(express.urlencoded({extended: false}))

app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.get("/", (req, res) => {
    res.render("Home", {
        user : req.user,
    })
})

app.use("/user", userRouter)
app.listen(PORT, ()=> console.log(`Server Statrted SuccessFully !! ${PORT}`))