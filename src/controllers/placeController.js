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

const savePlaceReview = async function(req, res) {
  try {
    const { text, grade, items, userId } = req.body;
    const { id: placeId } = req.params;

    if (!grade || !userId || !placeId || !items || items.length === 0) {
      throw new BadRequestException('One or more parameters are missing');
    }

    const newReviewRecord = await Review.build({
      text,
      grade,
      user_id: userId,
      place_id: placeId
    }).save();

    await newReviewRecord.setReviewItems(items);

    return res.status(HttpStatusCodes.CREATED).json({ id: newReviewRecord.id });
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
  getPlaceInfo,
  savePlaceReview
};
