const router = require('express').Router();
const {
  getFavoritePlaces,
  saveNewFavoritePlace
} = require('../controllers/userController');

router
  .route('/:id/favorites')
  .get(getFavoritePlaces)
  .post(saveNewFavoritePlace);

module.exports = router;
