const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const userRouter = require("./routes/user.js")

const app = express();
const PORT = 8000

mongoose
.connect("mongodb://localhost:27017/blogify")
.then((e)=> console.log("MongoDb Connected"))
app.set("view engine", 'ejs')
app.set("views", path.resolve("./views/partials"))

app.use(express.urlencoded({extended: false}))
app.get("/", (req, res) => {
    res.render("Home")
})

app.use("/user", userRouter)
app.listen(PORT, ()=> console.log(`Server Statrted SuccessFully !! ${PORT}`))