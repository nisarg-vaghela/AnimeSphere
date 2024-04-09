const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const isAuthor = require("../../middleware/isAuthor");

//Article Model
const Anime = require("../../models/anime.js");

// @route GET api/animes
// @desc Get All Animes
// @access Public
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find().sort({ date: -1 });
    res.json(animes);
  } catch (err) {
    console.log(err);
  }
});

// @route POST api/animes
// @desc Create An anime
// @access Private
router.post('/', async (req, res) => {
    // console.log("post",req.body);
    try {
        const newAnime = new Anime(req.body);
        await newAnime.save().then(anime => res.json(anime));
    } catch (err) {
        console.log(err);
    }
});

// @route PUT api/animes
// @desc Update An anime
// @access Private and isAuthor
router.put("/:id", [auth], async (req, res) => {
  try {
    anime = await Anime.findByIdAndUpdate(req.params.id, req.body);
    res.json(anime);
  } catch (err) {
    console.log(err);
  }
});

// @route DELETE api/animes/:id
// @desc Delete An anime
// @access Private and isAuthor////////////////////////////////////
// router.delete('/:id', async (req, res) => {
//     try {
//         anime = await Anime.findByIdAndDelete(req.params.id);
//         res.json(anime);
//     } catch (err) {
//         console.log(err);
//     }
// });

// @route GET api/animes/:id
// @desc Get an Anime
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findOne({ mal_id: req.params.id }).populate({
      path: "reviews",
      populate: { path: "user", select: "-password -email" },
      options: { sort: { date: -1 } },
    });
    res.json(anime);
  } catch (err) {
    console.log(err);
  }
});

// // @route POST api/articles
// // @desc Create A Post
// // @access Private
// router.post('/', auth, async (req, res) => {
//     //console.log("post",req.body);
//     const newArticle = new Article(req.body);

//     await newArticle.save().then(article => res.json(article));
// });

// // @route PUT api/articles
// // @desc Update A Post
// // @access Private and isAuthor//////////////////////////////////
// router.put('/:id', [auth,isAuthor], async (req, res) => {
//     //console.log("edit put user",req.user);
//     try {
//         article = await Article.findByIdAndUpdate(req.params.id,req.body);
//         res.json(article);
//     } catch (err) {
//         console.log(err);
//     }
// });

// // @route DELETE api/articles/:id
// // @desc Delete A Post
// // @access Private and isAuthor////////////////////////////////////
// router.delete('/:id', [auth,isAuthor], async (req, res) => {
//     try {
//         article = await Article.findByIdAndDelete(req.params.id);
//         res.json(article);
//     } catch (err) {
//         console.log(err);
//     }
// });

// // @route GET api/articles/:id
// // @desc Get an Article
// // @access Public
// router.get('/:id', async(req, res) => {
//     const article = await Article.findById(req.params.id);
//     res.json(article);
// });

module.exports = router;
