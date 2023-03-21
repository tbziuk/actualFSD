const express = require('express');
const router = express.Router();

const booksApiController = require('../controllers/booksApiController');

router.get('/', booksApiController.index);

router.get('/:id', booksApiController.oneBook);

router.post('/', booksApiController.add);

router.put('/:id', booksApiController.update);

router.delete('/:id', booksApiController.delete);

router.get('/books/read', booksApiController.read);

router.get('/books/unread', booksApiController.unread);

module.exports = router;