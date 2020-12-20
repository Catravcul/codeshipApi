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
  config: {
    type: Object,
    default: {fuselage: 'StandardF', propulsionEngine: 'StandardPE', takeoff: 'StandardTO'}
  }
});

const Spaceship = mongoose.model('Spaceship', spaceshipSchema);
module.exports = Spaceship;
