const express = require("express");
const router = express.Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
      user: req.user,
    });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    return res.redirect("/")
  });

module.exports = router;
