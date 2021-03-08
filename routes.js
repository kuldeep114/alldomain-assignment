const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

router.get("/posts", async (req, res) => {

  const pageCount = Math.ceil(await Post.find().count() / req.query.limit);
  let page = parseInt(req.query.page);
  if (!page || page <= 0) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  const limit = req.query.limit;
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const posts = await Post.find().skip(startIndex).limit(endIndex);

  res.send({"posts": posts,
            "page": page,
            "pageCount": pageCount
        });
});


router.get("/posts/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const post = await Post.findOne({ id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});


module.exports = router;
