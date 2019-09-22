const router = require('express').Router();
const disabilityController = require('../controllers/disabilityController');

router.route('/').get(disabilityController.getAll);

module.exports = router;
