const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/:id/favorites').get(userController.getFavoritePlaces);

module.exports = router;
