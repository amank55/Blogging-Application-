const express = require("express");
const User = require("../models/user.models.js"); // Ensure the correct path
const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.post("/signin", async(req, res) => {
    const {  email, password } = req.body
    const user= await User.matchPassword(email, password)
    console.log("User", user)
    return res.redirect("/")
})

router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        await User.create({ fullname, email, password });
        return res.redirect("/"); // Fixed redirect
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Server error");
    }
});



module.exports = router;
