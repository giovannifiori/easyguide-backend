const { UserPlaces, Review, DisabilityItem } = require('../models');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const {
  exceptionHandler,
  ServerError,
  BadRequestException
} = require('../common/exceptions');
const GoogleApi = require('../services/googleApi');
const GoogleApiStatus = require('../common/util/GoogleApiStatus');
const GOOGLE_API_OUTPUT = 'json'; //json or xml

const getFavoritePlaces = async function(req, res) {
  try {
    const { id } = req.params;

    let favoritePlaces = await UserPlaces.findAll({
      where: {
        user_id: id
      },
      attributes: {
        exclude: ['user_id', 'updatedAt']
      }
    }).map(p => p.dataValues);

    favoritePlaces = await Promise.all(favoritePlaces.map(async place => {
      const placesResponse = await GoogleApi.get(`place/details/${GOOGLE_API_OUTPUT}`, {
        params: {
          key: process.env.GOOGLE_API_KEY,
          place_id: place.place_id,
          region: 'br',
          language: 'pt-BR',
          fields: 'formatted_address,geometry,name,photo,type,formatted_phone_number'
        }
      });

      if (placesResponse.status !== 200) {
        throw new ServerError('Failed to fetch places');
      }

      if(placesResponse.data.status !== GoogleApiStatus.OK) {
        return null;
      }

      return {
        ...place,
        ...placesResponse.data.result
      };
    }));

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
          required: false,
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
