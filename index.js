const path = require("path")
const express = require("express")
const app = express();
const PORT = 8000

app.set("view engine", 'ejs')
app.set("views", path.resolve("./views"))
app.get("/", (req, res) => {
    res.render("Home")
})
app.listen(PORT, ()=> console.log(`Server Statrted SuccessFully !! ${PORT}`))