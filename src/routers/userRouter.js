const router = require('express').Router();
const {
  getFavoritePlaces,
  saveNewFavoritePlace,
  getReviews
} = require('../controllers/userController');

router
  .route('/:id/favorites')
  .get(getFavoritePlaces)
  .post(saveNewFavoritePlace);
router.route('/:id/reviews').get(getReviews);

module.exports = router;
