const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

router.get('/', (req, res, next) => {
  postController.getPosts(res);
});

router.get('/:id', (req, res, next) => {
  postController.getSinglePost(req, res);
});

router.post('/', (req, res, next) => {
  postController.createSinglePost(req, res);
});

router.patch('/:id', (req, res, next) => {
  postController.editSinglePost(req, res);
});

router.delete('/', (req, res, next) => {
  postController.deleteAllPosts(res);
});

router.delete('/:id', (req, res, next) => {
  postController.deleteSinglePost(req, res);
});

module.exports = router;
