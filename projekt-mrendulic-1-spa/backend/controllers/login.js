const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Korisnik = require('../models/korisnik')
 
loginRouter.post('/api/login', async (req, res) => {
  // Tijelo rute
  const podaci = req.body
 
    const korisnik = await Korisnik.findOne({username: podaci.username})
    const passDobar = korisnik === null
    ? false
    : await bcrypt.compare(podaci.pass, korisnik.passHash)

    if(!(korisnik && passDobar)){
        return res.status(401).json({
          error: 'neispravni korisnik ili lozinka'
        })
      }

    /*Korisnik je ok i lozinka je ok */
    /*Generiraj token i posalji ga korisniku */
    const userToken = {
        username: korisnik.username,
        id: korisnik._id
      }

    /*Digitalni token */
    const token = jwt.sign(userToken, process.env.SECRET)
   
    res.status(200).send({
        token, username: korisnik.username, ime: korisnik.ime
      })
})
 
module.exports = loginRouter