const { UserPlaces } = require('../models');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const { exceptionHandler } = require('../common/exceptions');

const getFavoritePlaces = async function(req, res) {
  try {
    const { id } = req.params;

    const favoritePlaces = await UserPlaces.findAll({
      where: {
        user_id: id
      },
      attributes: {
        exclude: ['user_id', 'updatedAt']
      }
    });

    return res.status(HttpStatusCodes.SUCCESS).json(favoritePlaces);
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

module.exports = {
  getFavoritePlaces
};
