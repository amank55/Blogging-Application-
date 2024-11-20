const express = require("express");
const multer = require("multer")
const router1 = express.Router();
const path = require("path")
const Blog = require("../models/blog.js")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/upload`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}- ${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router1.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router1.post("/",upload.single('coverImage') ,async (req, res) => {
    const {title, body} = req.body
    const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/upload/${req.file.filename}`
  })
  return res.redirect(`/blog/${blog._id}`);
});


module.exports = router1;
