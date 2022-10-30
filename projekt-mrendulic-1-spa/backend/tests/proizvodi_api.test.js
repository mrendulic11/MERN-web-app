const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Proizvod = require('../models/proizvod')
const pomocni = require('./test_pomocni')

const api = supertest(app)
 
beforeEach( async () => {
    await Proizvod.deleteMany({})
    let objektProizvod = new Proizvod(pomocni.productData[0])
    await objektProizvod.save()
    objektProizvod = new Proizvod(pomocni.productData[1])
    await objektProizvod.save()
    objektProizvod = new Proizvod(pomocni.productData[2])
    await objektProizvod.save()
  })

  describe('testovi za GET', () => {
test('proizvodi se vraćaju kao JSON', async () => {
  await api
    .get('/api/productData')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Imamo tri proizvoda', async () => {
    const odgovor = await api.get('/api/productData')
    expect(odgovor.body).toHaveLength(pomocni.productData.length)
  })
   
  test('Prvi proizvod je Mlijeko', async () => {
    const odgovor = await api.get('/api/productData')
   
    const sadrzaj= odgovor.body.map(p=>p.title)
    expect(sadrzaj).toContain('Mlijeko')
  })
})

describe('testovi za POST', () => {
  	
test('dodavanje ispravnog proizvoda', async () => {
    const noviProizvod = {
        title: 'Šećer',
        opis: 'Bijeli',
        price: 10,
        ducan: 'Plodine',
        omiljen: true
    }
    await api
    .post('/api/productData')
    .send(noviProizvod)
    .expect(401)  /*Nije autoriziran */
    .expect('Content-Type', /application\/json/)
   
    const porukeNaKraju = await pomocni.proizvodiIzBaze()
    /*expect(porukeNaKraju).toHaveLength(pomocni.productData.length + 1) */
    expect(porukeNaKraju).toHaveLength(3)
    /* const sadrzaj = porukeNaKraju.map(p => p.title)  
    console.log(sadrzaj) */
    /*expect(sadrzaj).toContain('Šećer')*/ /*Nema tokena */
  })
 
test('dodavanje proizvoda bez naslova', async () => {
    const noviProizvod = {   
        opis: 'Bijeli',
        price: 10,
        ducan: 'Plodine',
        omiljen: true
    }
    await api
    .post('/api/productData')
    .send(noviProizvod)
    .expect(401)  /*Nije autoriziran */

    const porukeNaKraju = await pomocni.proizvodiIzBaze() 
    expect(porukeNaKraju).toHaveLength(pomocni.productData.length)  
  })

  test('dodavanje proizvoda bez tokena', async () => {
  const noviProizvod = {   
      opis: 'Bijeli',
      price: 10,
      ducan: 'Plodine',
      omiljen: true
  }
  await api
  .post('/api/productData')
  .send(noviProizvod)
  .expect(401)  

  const porukeNaKraju = await pomocni.proizvodiIzBaze() 
  expect(porukeNaKraju).toHaveLength(pomocni.productData.length)  
}) 
}) 



describe('testovi za dohvat', () => {
test('dohvat specificnog proizvoda', async () => {
    const productData = await pomocni.proizvodiIzBaze()
    const trazenProizvod = productData[0]
  
    const odgovor = await api
    .get(`/api/productData/${trazenProizvod.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const jsonPoruka = JSON.parse(JSON.stringify(trazenProizvod))
    expect(odgovor.body).toEqual(jsonPoruka)
  })})

  describe('testovi za DELETE', () => {
  test('ispravno brisanje proizvoda', async () => {
    const productData = await pomocni.proizvodiIzBaze()
    const proizvodZaBrisanje = productData[0]
  
    const odgovor = await api
      .delete(`/api/productData/${proizvodZaBrisanje.id}`)
      .expect(401)  /*Nije autoriziran */
  
    const proizvodiKraj = await pomocni.proizvodiIzBaze()
    /*expect(proizvodiKraj).toHaveLength(productData.length - 1)*/
    expect(proizvodiKraj).toHaveLength(3)

    /*const sadrzaj = proizvodiKraj.map(p => p.title)    --> ne valja jer ja imam više proizvoda sa istim naslovom*/
    expect(proizvodiKraj).not.toContain(proizvodZaBrisanje)
  }) })

  
  describe ('testovi za PUT', () => {
  test("Mijenjanje omiljenosti proizvoda", async () => {
    const productData = await pomocni.proizvodiIzBaze()
    const omiljenZaMijenjanje = productData[0];
    const izmjenaOmiljen = {
      omiljen: false,
    };
    await api
      .put(`/api/productData/${omiljenZaMijenjanje.id}`)
      .send(izmjenaOmiljen)
      .expect(401)  /*Nije autoriziran */
      .expect("Content-Type", /application\/json/);
  });})

afterAll(() => {
  mongoose.connection.close()
})