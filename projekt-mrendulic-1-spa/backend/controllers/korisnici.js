const bcrypt = require('bcrypt')
const korisniciRouter = require('express').Router()
const { model } = require('mongoose')
const Korisnik = require('../models/korisnik')

  korisniciRouter.get('/api/korisnici', async (req, res) => {
    const korisnici = await Korisnik.find({}).populate('proizvodi', {title: 1, opis: 1, price: 1, ducan: 1})
    res.json(korisnici)
  })
 
korisniciRouter.post('/api/korisnici', async (req, res) => {
  const sadrzaj = req.body
  // sadrzaj = {ime: la, username: aaa, pass: lozinka}
 
  const runde = 10
  const passHash = await bcrypt.hash(sadrzaj.pass, runde)
 
  const korisnik = new Korisnik({
    username: sadrzaj.username,
    ime: sadrzaj.ime,
    passHash: passHash
  })
 
  const sprKorisnik = await korisnik.save()
  res.json(sprKorisnik)
})
 
module.exports = korisniciRouter