const axios = require("axios");

// @desc    Get SpaceX Data
// @route   POST api/v1/spacex
// @access  Private
exports.getSpaceXData = async (req, res, next) => {
  try {
    const { query, options } = req.body;
    
    // Get SpaceX Data
    const spacexData = await axios.post(
      `${process.env.SERVER_URL}/launches/query`,
      {
        query,
        options,
      }
    );

    res.status(200).json({
      success: true,
      data: spacexData.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Get SpaceX Launch Data
// @route   GET api/v1/spacex/:id
// @access  Private
exports.getSpaceXLaunch = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Get SpaceX Data
    const spacexData = await axios.get(`${process.env.SERVER_URL}/launches/${id}`);

    res.status(200).json({
      success: true,
      data: spacexData.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
