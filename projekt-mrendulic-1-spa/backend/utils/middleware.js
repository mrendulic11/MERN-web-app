const logger = require('./logger')

/*middleware */
const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
  }

const errorHandler = (err, req, res, next ) => {
    console.log(err.message);
  
    if (err.name === 'CastError') {
        return res.status(400).send({error: 'krivi format ID-a'})
    } else if (err.name === 'ValidationError'){
      return res.status(400).send({error: err.message})
    } else if (err.name === 'JsonWebTokenError'){
      return res.status(401).json({error: 'nesipravni token'})
    }
    
    next(err)
  }
  
      
  function zadnjiErrorHandler (err, req, res, next) {
    res.status(500)
    res.send('error', { error: err })
  }

  module.exports = {zahtjevInfo, errorHandler, zadnjiErrorHandler}