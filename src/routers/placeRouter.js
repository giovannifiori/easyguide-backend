const router = require('express').Router();
const placeController = require('../controllers/placeController');

router.route('/nearby').get(placeController.getNearbyPlaces);
router.route('/search').get(placeController.searchPlaces);
router.route('/:id').get(placeController.getPlaceInfo);
router.route('/:id/reviews').post(placeController.savePlaceReview);

module.exports = router;
