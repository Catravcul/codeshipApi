const Spaceship = require('./../models/spaceshipModel');

exports.store = async (req, res, next) => {
  try {
    const newSpaceship = await Spaceship.create(req.body);
    return res.status(200).json({
      status: 'success',
      data: { spaceship: newSpaceship },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  next();
};

exports.show = async (req, res, next) => {
  try {
    const spaceship = await Spaceship.findById(req.params.id);
    return res.status(200).json({
      status: 'OK',
      data: {spaceship: spaceship},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.update = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const updated = await Spaceship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'OK',
      data: {spaceship: updated},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};