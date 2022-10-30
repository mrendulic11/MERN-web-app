const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const proizvodiRouter = require('./controllers/proizvodi')
const korisniciRouter = require('./controllers/korisnici')
const loginRouter=require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
 
mongoose.connect(config.url)
  .then(result => {
    logger.info("Spojeni smo na bazu");
  }).catch(error => {
    logger.greska("Greška pri spajanju", error.message);
  })
  	
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.zahtjevInfo)
 
app.use('/', proizvodiRouter)
app.use('/', korisniciRouter)
app.use('/', loginRouter)
 
app.use(middleware.errorHandler)
app.use(middleware.zadnjiErrorHandler)
 
module.exports = app