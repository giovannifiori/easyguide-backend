const router = require('express').Router();
const {
  getFavoritePlaces,
  saveNewFavoritePlace,
  getReviews,
  removePlaceFromFavorites
} = require('../controllers/userController');

router
  .route('/:id/favorites')
  .get(getFavoritePlaces)
  .post(saveNewFavoritePlace)
  .delete(removePlaceFromFavorites);
router.route('/:id/reviews').get(getReviews);

module.exports = router;
