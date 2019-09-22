const { UserPlaces, Review, DisabilityItem } = require('../models');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const {
  exceptionHandler,
  BadRequestException
} = require('../common/exceptions');

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

const saveNewFavoritePlace = async function(req, res) {
  try {
    const { id: placeId } = req.body;
    const { id: userId } = req.params;

    if (!placeId) {
      throw new BadRequestException('placeId must not be null or empty');
    }

    const newRecord = await UserPlaces.build({
      user_id: userId,
      place_id: placeId
    }).save();

    return res.status(HttpStatusCodes.CREATED).json(newRecord);
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

const getReviews = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const { limit, offset } = req.query;

    if (offset && !limit) {
      throw new BadRequestException('offset only allowed paired with a limit');
    }

    const reviews = await Review.findAll({
      where: {
        user_id: userId
      },
      include: [
        {
          model: DisabilityItem,
          as: 'reviewItems',
          required: true,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ],
      limit,
      offset
    });

    return res.status(HttpStatusCodes.SUCCESS).json(reviews);
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

module.exports = {
  getFavoritePlaces,
  saveNewFavoritePlace,
  getReviews
};
