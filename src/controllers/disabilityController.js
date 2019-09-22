const { Disability, DisabilityItem } = require('../models');
const HttpStatusCodes = require('../common/util/HttpStatusCodes');
const { ServerError } = require('../common/exceptions');

const getAll = async function(req, res) {
  try {
    const disabilities = await Disability.findAll({
      include: [
        {
          model: DisabilityItem,
          as: 'items',
          attributes: ['id', 'name']
        }
      ]
    });

    return res.status(HttpStatusCodes.SUCCESS).json(disabilities);
  } catch (e) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ServerError(e.message, HttpStatusCodes.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  getAll
};
