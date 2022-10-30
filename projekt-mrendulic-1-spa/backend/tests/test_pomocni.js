	
const Proizvod = require('../models/proizvod')	
const Korisnik = require('../models/korisnik')	
 
const productData = [
    {
        id: 1,
        title: 'Mlijeko',
        opis: 'z bregov',
        price: 7,
        ducan: 'Plodine',
        omiljen: true
    },
    {
        id: 2,
        title: 'Mlijeko',
        opis: 'dukat',
        price: 8,
        ducan: 'Konzum',
        omiljen: true
    },
    {
        id: 3,
        title: 'Kruh',
        opis: 'bijeli',
        price: 10,
        ducan: 'Konzum',
        omiljen: false
    },]
 
const proizvodiIzBaze = async () => {
  const proizvodi = await Proizvod.find({})
  return proizvodi.map(p => p.toJSON())
}	
 
const korisniciUBazi = async () => {
  const korisnici = await Korisnik.find({})
  return korisnici.map(k => k.toJSON())
}
 
module.exports = {
  productData, proizvodiIzBaze, korisniciUBazi
}