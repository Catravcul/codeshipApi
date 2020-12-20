const Spaceship = require('./../models/spaceshipModel')

exports.index = async (req, res) => {
  try {
    const spaceships = await Spaceship.find()
    const datas = []
    spaceships.forEach(spaceship => {
      const {owner, config, ...data} = spaceship
      datas.push(data)
    })
    return res.status(200).json({
      spaceships: datas
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.store = async (req, res) => {
  try {
    req.body.owner = req.id
    const newSpaceship = await Spaceship.create(req.body)
    const {owner, config, ...data} = newSpaceship
    return res.status(200).json({
      spaceship: data
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id || req.id
    const spaceship = await Spaceship.findOne({owner: id})
    if(req.params.id) var {owner, config, ...data} = spaceship
    return res.status(200).json({
      spaceship: data || spaceship
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.update = async (req, res, next) => {
  try {
    let updated
    if (req.params.id) {
      const {owner, config, ...body} = req.body
      updated = await Spaceship.findByIdAndUpdate(
        req.params.id, body, {new: true, runValidators: true,}
      )
    } else {
      const {owner, ...body} = req.body
      updated = await Spaceship.findOneAndUpdate(
        {owner: req.id}, body, {new: true, runValidators: true}
      )
    }
    res.status(200).json({
      spaceship: updated
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.drop = async (req, res, next) => {
  let result;
  try {
    result = await Spaceship.remove({}, err => {
      return err
    })
    res.status(200).json({
      result: result
    })
  } catch(err) {
    res.status(400).json({
      err: err.message
    })
  }
}