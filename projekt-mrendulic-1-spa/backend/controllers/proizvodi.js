const proizvodiRouter = require('express').Router()
const Proizvod = require('../models/proizvod')
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')

const dohvatiToken = (req) => {
  /*Dohvati zaglavlje */
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    return auth.substring(7)
  }
  return null
}

proizvodiRouter.get('/', (req, res) =>{
  res.send('<h1>Pozdrav od Express servera!</h1>')
})

/* proizvodiRouter.get('/api/productData', (req, res) =>{
  Proizvod.find({}).then(rezultat => {
    res.json(rezultat)
  })
})*/

	
proizvodiRouter.get('/api/productData', async (req, res) => {
  const proizvodi = await Proizvod.find({})
    .populate('korisnik', { username: 1, ime: 1 })
  res.json(proizvodi)
 
})

/*Ispis poruke po odabranom id-u */
proizvodiRouter.get('/api/productData/:id', async (req, res, next) =>{
  const proizvod = await Proizvod.findById(req.params.id)
  if (proizvod) {
    res.json(proizvod)
  } else {
    res.status(404).end()
  }
  })

  /*proizvodiRouter.delete('/api/productData/:id', async (req, res) => {

    const token=dohvatiToken(req)
  
      Dekodirani token
      const dekToken = jwt.verify(token, process.env.SECRET)
      if (!token || !dekToken.id){
        return res.status(401).json({error: 'neispravni ili nepostojeći token'})
      }
      
      const korisnik = await Korisnik.findById(dekToken.id)
  
    await Proizvod.findByIdAndRemove(req.params.id)
    res.status(204).end()
    }) */



proizvodiRouter.delete('/api/productData/:id', async (req, res) => {
  const id = req.params.id
  const token=dohvatiToken(req)

  /*Dekodirani token */
  const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    }
    
  const korisnik = await Korisnik.findById(dekToken.id)
  const originalniProizvod = await Proizvod.findById(id)

  if (String(korisnik._id) !== String(originalniProizvod.korisnik)) {
    return res.status(401).json({ error: "niste autor podatka" })
  }

  await Proizvod.findByIdAndRemove(id)
  korisnik.proizvodi = korisnik.proizvodi.filter(p => String(p) != String(originalniProizvod._id))
    await korisnik.save()
    res.status(204).end()
  })



  proizvodiRouter.post('/api/productData', async (req, res, next) => {
    /*U req.body nam sprema ono sto je klijent poslao uz post zahtjev kao sadrzaj */
    const podatak = req.body
    const token=dohvatiToken(req)

    /*Dekodirani token */
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id){
      return res.status(401).json({error: 'neispravni ili nepostojeći token'})
    }
    
    const korisnik = await Korisnik.findById(dekToken.id)
    /*const korisnik = await Korisnik.findById(podatak.korisnikId)*/

    console.log("Dodajem porukuuu")
    const noviProizvod = new Proizvod ({
      title: podatak.title,
      opis:podatak.opis,
      price: podatak.price,
      ducan: podatak.ducan,
      omiljen: podatak.omiljen || false,
      korisnik: korisnik._id
    })

    const novi = await noviProizvod.save()
    korisnik.proizvodi = korisnik.proizvodi.concat(novi._id)
    await korisnik.save()
    res.json(novi)

    /* noviProizvod.save().then(spremljenProizvod => {
      res.json(spremljenProizvod)
    }).catch(err => next(err)) */
  })

  /* proizvodiRouter.put('/api/productData/:id', (req, res) => {
    const proizvod = req.body
    const id = req.params.id
    
    console.log("Promjena važnosti poruke sa ID", id)
    console.log(proizvod)

    const podatak = {
      title: proizvod.title,
      opis: proizvod.opis,
      price: proizvod.price,
      ducan: proizvod.ducan,
      omiljen: proizvod.omiljen
    }
    
    Treba izmjenit u async/await
    Proizvod.findByIdAndUpdate(id, podatak, {new: true})
    .then( noviPodatak => {
      res.json(noviPodatak)
    })
    .catch(err => next(err))
  }) */

  proizvodiRouter.put('/api/productData/:id', async (req, res, next) => {
    const proizvod = req.body
    const id = req.params.id
    
    console.log("Promjena važnosti poruke sa ID", id)
    console.log(proizvod)

    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "pogresan token" })
    }

    const korisnik = await Korisnik.findById(dekToken.id)
    const originalniProizvod = await Proizvod.findById(id)

    if (String(korisnik._id) !== String(originalniProizvod.korisnik)) {
      console.log(korisnik._id)
      console.log(originalniProizvod.korisnik)
      return res.status(401).json({ error: "niste autor podatka" })
    }

    const podatak = {
      title: proizvod.title,
      opis: proizvod.opis,
      price: proizvod.price,
      ducan: proizvod.ducan,
      omiljen: proizvod.omiljen
    }

    var p = await Proizvod.findByIdAndUpdate(id, podatak, { new: true })
    res.json(p)
  })
 
module.exports = proizvodiRouter