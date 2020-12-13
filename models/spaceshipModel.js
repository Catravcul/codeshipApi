const mongoose = require('mongoose')
const UserModel = require('./userModel')

const spaceshipSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'A spacheship must have an owner'],
    validate: {
      validator: (id) => {
        return UserModel.findById(id)
      },
      message: 'Please enter a valid id'
    }
  },
  name: {
    type: String,
    trim: true,
    maxlength: [15, 'A spaceship name must be less than 15 characters.'],
    minlength: [3, 'A spaceship name must be greater than 3 characters.'],
  },
  goal: {
    type: String,
    trim: true,
    maxlength: [150, 'A spaceship goal must be less than 150 characters.']
  },
  goal_explanation: {
    type: String,
    trim: true,
    maxlength: [300, 'A goal explanation must be less than 300 characters.']
  },
  goal_reason: {
    type: String,
    trim: true,
    maxlength: [500, 'A goal reason must be less than 300 characters.']
  },
  config_path: {
    type: String,
    required: [true, 'A spaceship must have a config file path'],
    unique: [true, 'A spaceship must have an unique config file']
  },
  components_path: {
    type: String,
    required: [true, 'A spaceship must have a components file path'],
    unique: [true, 'A spaceship must have an unique components file']
  }
});

const Spaceship = mongoose.model('Spaceship', spaceshipSchema);
module.exports = Spaceship;
