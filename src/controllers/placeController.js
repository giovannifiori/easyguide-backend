const { Review, DisabilityItem } = require('../models');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const {
  BadRequestException,
  exceptionHandler
} = require('../common/exceptions');

const getPlaceInfo = async function(req, res) {
  try {
    const place = {};
    const { id } = req.params;

    const { limit, offset } = req.query;

    if (offset && !limit) {
      throw new BadRequestException('offset only allowed paired with a limit');
    }

    place.reviews = await getPlaceReviews(id, limit, offset);

    return res.status(HttpStatusCodes.SUCCESS).json(place);
  } catch (e) {
    return exceptionHandler(e, res);
  }
};

const getPlaceReviews = async (placeId, limit, offset) => {
  const reviews = await Review.findAll({
    where: {
      place_id: placeId
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

  return reviews;
};

module.exports = {
  getPlaceInfo
};
