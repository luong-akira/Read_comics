const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Comic } = require('../models/comic');

// GET     /comic/
// desc    get all the comics
// Auth    Public
router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const sort = req.query.sort || '-totalCount';
    const myCustomLabels = {
      page: 'currentPage',
      meta: 'paginator',
    };
    const options = {
      limit: 4,
      page: page,
      sort: sort,
      customLabels: myCustomLabels,
    };
    Comic.paginate({}, options, function (err, result) {
      if (err) {
        return;
      }
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /search?search=
// desc    Search specific comics
// Auth    Public
router.get('/search', async (req, res) => {
  try {
    const search = req.query.search;
    const page = req.query.page || 1;
    const myCustomLabels = {
      page: 'currentPage',
      meta: 'paginator',
    };
    const options = {
      limit: 4,
      page: 1,
      customLabels: myCustomLabels,
    };
    Comic.paginate(
      { name: { $regex: search, $options: 'i' } },
      options,
      function (err, result) {
        if (result.paginator.totalDocs === 0) {
          return res.redirect(`/comic/search/author?search=${search}`);
        }
        return res.status(200).json(result);
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /search?search=
// desc    Search by author name
// Auth    Public
router.get('/search/author', async (req, res) => {
  try {
    const search = req.query.search;
    const page = req.query.page || 1;
    const myCustomLabels = {
      page: 'currentPage',
      meta: 'paginator',
    };
    const options = {
      limit: 4,
      page: 1,
      customLabels: myCustomLabels,
    };
    Comic.paginate(
      { author: { $regex: search, $options: 'i' } },
      options,
      function (err, result) {
        if (err) {
          return;
        }
        return res.status(200).json(result);
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /comic/genre/genreName
// desc    get comics by genre
// Auth    Public
router.get('/genre/:genreName', async (req, res) => {
  try {
    const page = req.query.page || 1;

    const myCustomLabels = {
      page: 'currentPage',
      meta: 'paginator',
    };
    const options = {
      limit: 1,
      page: page,
      customLabels: myCustomLabels,
    };
    Comic.paginate({ genres: req.params.genreName }, options, function (
      err,
      result
    ) {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /comic/completedComics
// desc    get completed Comics
// Auth    Public
router.get('/completedComic', async (req, res) => {
  try {
    const page = req.query.page || 1;

    const myCustomLabels = {
      page: 'currentPage',
      meta: 'paginator',
    };
    const options = {
      limit: 1,
      page: page,
      customLabels: myCustomLabels,
    };
    Comic.paginate({ isCompleted: true }, options, function (err, result) {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /comic/hotcomics
// desc    get hot Comics
// Auth    Public
router.get('/hotcomics', async (req, res) => {
  try {
    const comics = await Comic.find().limit(10).sort('-totalCount');
    res.status(200).json(comics);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST     /comic/
// desc    create a new comic
// Auth    Public
router.post('/', async (req, res) => {
  try {
    const newComic = await Comic.create({
      name: req.body.name,
    });

    const comic = await Comic.find();
    res.send(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST     /comic/rating
// desc    Rate a comic
// Auth    Private
router.put('/:comicid/rating', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.comicid });
    const ratingId = comic.rating.find((rate) => rate.user == req.user.id);

    if (ratingId) {
      return res.status(400).json({ msg: 'You already rate this comic' });
    }
    comic.rating.push({ user: req.user.id, value: req.body.value });
    await comic.save();
    const comicAverage = await Comic.aggregate([
      { $match: { slug: req.params.comicid } },
      {
        $group: { _id: '$name', total: { $sum: { $avg: ['$rating.value'] } } },
      },
    ]);

    comic.averageRating =
      Math.round((comicAverage[0].total + Number.EPSILON) * 100) / 100;
    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /comic/comicId
// desc    get comic by id
// Auth    Public
router.get('/:id', async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    if (!comic) {
      return res.status(404).json({ msg: '404 NOT FOUND' });
    }

    res.status(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET     /comic/comicId/chapterid
// desc    get chapter of a specific comic
// Auth    Public
router.get('/:id/:chapterID', async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    if (!comic) {
      return res.status(404).json({ msg: '404 NOT FOUND' });
    }
    const found = comic.chapters.find(
      (chapter) => chapter.slug == req.params.chapterID
    );
    if (!found) {
      res
        .status(404)
        .json({ msg: 'Sorry, the page you have requested cannot be found.' });
    }
    found.counter = found.counter + 1;
    comic.totalCount += 1;
    await comic.save();
    res.status(200).json(found);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// POST     /comic/comicId
// desc    comment on a specific comic
// Auth    Private
router.post('/:id', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const comment = {
      user: req.user.id,
      username: req.user.username,
      comment: req.body.comment,
    };
    comic.comments.push(comment);
    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// POST     /comic/comicId/commentId
// desc    reply a comment
// Auth    Private
router.post('/:id/:commentId', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const commentIndex = comic.comments.findIndex(
      (comment) => comment.id == req.params.commentId
    );
    const reply = {
      user: req.user.id,
      username: req.user.username,
      comment: req.body.comment,
    };
    comic.comments[commentIndex].reply.push(reply);
    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// DELETE  /comic/comicId/commentId/replyId
// desc    delete a reply
// Auth    Private
router.post('/:id/:commentId/:replyId', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const commentId = comic.comments.find(
      (comment) => comment.id == req.params.commentId
    );
    const replyIndex = commentId.reply.findIndex(
      (reply) => reply.id == req.params.replyId
    );
    commentId.reply.splice(replyIndex, 1);
    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// DELETE    /comic/comicId/commentId
// desc    Delte a comment
// Auth    Private
router.delete('/:id/:commentId', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const comment = comic.comments.find(
      (comment) => comment.id === req.params.commentId
    );
    const commentIndex = comic.comments.indexOf(comment);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }
    if (req.user.id != comment.user) {
      return res.status(401).json({ msg: 'You are not owner of this comment' });
    } else if (req.user.id == comment.user) {
      comic.comments.splice(commentIndex, 1);
    }
    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST     /comic/like/comicId
// desc    like a specific comment
// Auth    Private
router.put('/:id/like/:commentId', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const comment = comic.comments.find(
      (comment) => comment.id == req.params.commentId
    );

    const like = comment.likes.find((like) => like.user == req.user.id);

    //Check if comment is liked by one user or not
    //if comment is liked then remove like
    if (!like) {
      comment.likes.push({ user: req.user.id });
    } else if (like) {
      let likeIndex = comment.likes.indexOf(like);

      comment.likes.splice(likeIndex, 1);
    }

    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST     /comic/dislike/comicId
// desc    dislike a specific comment
// Auth    Private
router.put('/:id/dislike/:commentId', auth, async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.id });
    const comment = comic.comments.find(
      (comment) => comment.id === req.params.commentId
    );
    const dislike = comment.dislikes.find(
      (dislike) => dislike.user == req.user.id
    );

    //Check if comment is disliked by one user or not
    //if comment is disliked then remove like
    if (!dislike) {
      comment.dislikes.push({ user: req.user.id });
    } else if (dislike) {
      let dislikeIndex = comment.dislikes.indexOf(dislike);
      comment.dislikes.splice(dislikeIndex, 1);
    }

    await comic.save();
    res.status(200).json(comic);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
