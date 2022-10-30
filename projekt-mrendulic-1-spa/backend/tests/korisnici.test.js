const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./test_pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Kada imamo samo jednog korisnika u bazi', () =>{
  beforeEach(async () => {
    await Korisnik.deleteMany({})

    const passHash = await bcrypt.hash('tajna', 10)
    const korisnik = new Korisnik({ime: 'Admin', username: 'admin', passHash})
    await korisnik.save()
  })


  test('ispravno vraca pogresku ako vec postoji username', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'admin',
      ime: 'Marijana Rendulic',
      pass: 'oarwa'
    }

    const rezultat = await api
    .post('/api/korisnici')
    .send(novi)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    expect(rezultat.body.error).toContain('`username` to be unique')

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length)
  })  

  test('stvaranje novog korisnika', async () =>{
    const pocetniKorisnici = await pomocni.korisniciUBazi()

    const novi = {
      username: 'mrendulic',
      ime: 'Marijana Rendulic',
      pass: 'oarwa'
    }

    await api
    .post('/api/korisnici')
    .send(novi)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const korisniciKraj = await pomocni.korisniciUBazi()
    expect(korisniciKraj).toHaveLength(pocetniKorisnici.length + 1)

    const korImena = korisniciKraj.map(u => u.username)
    expect(korImena).toContain(novi.username)
  })

})

afterAll(() => {
    mongoose.connection.close()
  })