const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user.js")
const router1 = require("./routes/blog.js")
const cookieParser = require("cookie-parser")

const Blog = require("./models/blog.js")
const { checkForAuthenticationCookie } = require("./middlewares/authentication.js")
const app = express();
const PORT = 8000

mongoose
.connect("mongodb://localhost:27017/blogify")
.then((e)=> console.log("MongoDb Connected"))
app.set("view engine", 'ejs')
app.set("views", path.resolve("./views/partials"))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public/")))
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("Home", {
        user : req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRouter)
app.use("/blog",router1)
app.listen(PORT, ()=> console.log(`Server Statrted SuccessFully !! ${PORT}`))