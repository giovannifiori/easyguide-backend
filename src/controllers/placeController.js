const { Review, DisabilityItem } = require('../models');

const googleApi = require('../services/googleApi');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const GoogleApiStatus = require('../common/util/GoogleApiStatus');
const {
  BadRequestException,
  ServerError,
  exceptionHandler
} = require('../common/exceptions');

//Constants
const GOOGLE_API_OUTPUT = 'json'; //json or xml
const DEFAULT_PLACES_RADIUS = 20 * 1000; //meters
const PLACE_ACCESSIBILITY = {
  NOT_ACCESSIBLE: 'NO',
  PARTIALLY_ACCESSIBLE: 'PARTIALY',
  ACCESSIBLE: 'YES'
};

async function getPlaceInfo(req, res) {
  try {
    const place = {};
    const { id } = req.params;

    const { limit, offset } = req.query;

    if (offset && !limit) {
      throw new BadRequestException('offset only allowed paired with a limit');
    }

    place.reviews = await fetchPlaceReviews(id, limit, offset);

    return res.status(HttpStatusCodes.SUCCESS).json(place);
  } catch (e) {
    return exceptionHandler(e, res);
  }
}

async function savePlaceReview(req, res) {
  try {
    const { text, isAccessible, items, userId } = req.body;
    const { id: placeId } = req.params;

    if (!isAccessible || !userId || !placeId) {
      throw new BadRequestException('One or more parameters are missing');
    }

    const newReviewRecord = await Review.build({
      text,
      is_accessible: isAccessible,
      user_id: userId,
      place_id: placeId
    }).save();

    if (items && items.length > 0) {
      await newReviewRecord.setReviewItems(items);
    }

    return res.status(HttpStatusCodes.CREATED).json({ id: newReviewRecord.id });
  } catch (e) {
    return exceptionHandler(e, res);
  }
}

async function fetchPlaceReviews(placeId, limit, offset) {
  const reviews = await Review.findAll({
    where: {
      place_id: placeId
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

  return reviews;
}

async function fetchPlaceCustomDetails(place) {
  const reviews = await Review.findAll({
    where: {
      place_id: place.place_id
    }
  });

  place.totalAccessibilityReviews = reviews.length;
  if (place.totalAccessibilityReviews > 0) {
    const positiveOpinionReviews = reviews.filter(
      review => review.is_accessible !== PLACE_ACCESSIBILITY.NOT_ACCESSIBLE
    );
    place.positiveOpinionsPercentage =
      (positiveOpinionReviews.length / reviews.length) * 100;
  } else {
    place.positiveOpinionsPercentage = 0;
  }
  return place;
}

async function searchPlaces(req, res) {
  try {
    const { query, location, radius } = req.query;

    if (!query) {
      throw new BadRequestException('A query is required');
    }

    const response = await googleApi.get(
      `place/textsearch/${GOOGLE_API_OUTPUT}`,
      {
        params: {
          location,
          query,
          region: 'br',
          language: 'pt-BR',
          radius: parseInt(radius) || DEFAULT_PLACES_RADIUS,
          key: process.env.GOOGLE_API_KEY
        }
      }
    );

    if (
      response.status !== 200 ||
      response.data.status !== GoogleApiStatus.OK
    ) {
      throw new ServerError('Error fetching places');
    }

    let results = [...response.data.results];

    results = await Promise.all(
      results.map(async place => fetchPlaceCustomDetails(place))
    );

    return res.status(HttpStatusCodes.SUCCESS).json(results);
  } catch (e) {
    return exceptionHandler(e, res);
  }
}

async function getNearbyPlaces(req, res) {
  try {
    const { location } = req.query;

    if (!location) {
      throw new BadRequestException('A location is required');
    }

    const response = await googleApi.get(
      `place/nearbysearch/${GOOGLE_API_OUTPUT}`,
      {
        params: {
          location,
          region: 'br',
          language: 'pt-BR',
          radius: 3.5 * 1000,
          type: 'establishment',
          key: process.env.GOOGLE_API_KEY
        }
      }
    );

    if (
      response.status !== 200 ||
      response.data.status !== GoogleApiStatus.OK
    ) {
      throw new ServerError('Error fetching places');
    }

    let results = [...response.data.results];

    results = await Promise.all(
      results.map(async place => fetchPlaceCustomDetails(place))
    );

    return res.status(HttpStatusCodes.SUCCESS).json(results);
  } catch (e) {
    return exceptionHandler(e, res);
  }
}

async function getPlacePhoto(req, res) {
  const { photoreference } = req.params;
  const maxWidth = 600;

  res.redirect(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoreference}&key=${process.env.GOOGLE_API_KEY}`
  );
}

module.exports = {
  getPlaceInfo,
  getPlacePhoto,
  getNearbyPlaces,
  savePlaceReview,
  searchPlaces,
  fetchPlaceCustomDetails
};
