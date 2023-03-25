const express = require('express');
const router = express.Router();

const UserController = require('../controllers/formController');

router.get('/', UserController.index);
router.post('/', UserController.signup);
router.delete('/:id', UserController.delete);

module.exports = router;