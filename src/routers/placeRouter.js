const router = require('express').Router();
const placeController = require('../controllers/placeController');

router.route('/:id').get(placeController.getPlaceInfo);

module.exports = router;
