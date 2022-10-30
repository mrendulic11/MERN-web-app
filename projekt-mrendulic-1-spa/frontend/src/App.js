import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Itemcard from './Components/Itemcard';
import PopisProizvoda from './Components/PopisProizvoda';
import { CartProvider } from 'react-use-cart';
import proizvodiAkcije from '../src/services/proizvodi';
import Proizvodicard from './Components/Proizvodicard';
import prijavaAkcije from './services/login'
import LoginForma from './Components/loginForma';
import Promjenjiv from './Components/Promjenjiv';
import ProizvodForma from './Components/ProizvodForma';
import {Button} from 'react-bootstrap';



const App = () => {
    const [pod, postaviProizvode]=useState([]);
    useEffect( () => {
        proizvodiAkcije.dohvatiSve()
        .then(res => postaviProizvode(res.data))
      }, [])

      useEffect( () => {
        const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
        if (logiraniKorisnikJSON) {
          const korisnik = JSON.parse(logiraniKorisnikJSON)
          postaviKorisnika(korisnik)
          proizvodiAkcije.postaviToken(korisnik.token)
        }
      }, [])

      const [ ispisSve, postaviIspis] = useState(true);
      const[trg, postaviTrg]=useState();

      const [username, postaviUsername] = useState('')
      const [pass, postaviPass] = useState('')
      const [korisnik, postaviKorisnika] = useState(null)

      const userLogin = async (e) => {
        e.preventDefault()
        try{
          const korisnik = await prijavaAkcije.prijava({
            username, pass
          }) 
          window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))
          proizvodiAkcije.postaviToken(korisnik.token)
          postaviKorisnika(korisnik)
          console.log(korisnik)
          postaviUsername('')
          postaviPass('')
        } catch (exception){
          alert('Neispravni podaci')
        }
      } 
  
      const podaciZaIspis = ispisSve
    ? pod
    : pod.filter(poruka => poruka.omiljen === true);

  
      const numDescending = [...pod].sort((a, b) => b.price - a.price);
      /*sad imam sortiran niz po cijeni i trebam uzet samo jedinstvene proizvode - najjeftinije*/
  
      /*Jedinstveni elementi - najjeftiniji*/
      const kljuc = 'title';
      const jedinstveniElementi = [...new Map(numDescending.map(item =>
      [item[kljuc], item])).values()];
  
      var filtered;
      if(trg==="Plodine"){
          filtered = numDescending.filter(proizvod => {
              return proizvod.ducan === 'Plodine';
            });
      }
      else if (trg==="Konzum")
      {
          filtered = numDescending.filter(proizvod => {
              return proizvod.ducan === 'Konzum';
            });
      }
      else if (trg==="Lidl")
      {
          filtered = numDescending.filter(proizvod => {
              return proizvod.ducan === 'Lidl';
            });
      }
      else if(trg==="Najjeftiniji")
      {
          filtered=jedinstveniElementi;
      }
      else{
          filtered=numDescending;
      }
  
      /*Ovdje ispisuje jedinstvene*/
      const key = 'title';
      const arrayUniqueByKey = [...new Map(filtered.map(item =>
          [item[key], item])).values()];


    const noviProizvod = (noviObjekt) => {    
      proizvodiAkcije.stvori(noviObjekt)
    .then(res => {
      postaviProizvode(pod.concat(res.data))
    })} 
  
  const promjenaOmiljenogProizvoda = (id) => {
    console.log("Moramo promijeniti omiljenost proizvoda", id);
    const url = `http://localhost:3001/api/productData/${id}`
    const proizvod = pod.find(p => p.id === id)
    const modProizvod = {
    ...proizvod,
    omiljen: !proizvod.omiljen
    }
    console.log(proizvod.omiljen)
    console.log(modProizvod)
    
    proizvodiAkcije.osvjezi(id, modProizvod)
    .then(response => {
      console.log("Responsic", response.data);
      postaviProizvode(pod.map(p => p.id !== id ? p : response.data))
    })
    console.log("test proizvoda", pod)
  }

  const brisiProizvod = (id) => {
    
    proizvodiAkcije.brisi(id)
      .then(response => {
        console.log(response);
        postaviProizvode(pod.filter(p => p.id !== id))
      })
  }

  	
const loginForma = () => {
  return (
    <Promjenjiv natpis='Prijavi se'>
      <LoginForma
          username={username}
          pass={pass}
          promjenaImena={({ target }) => postaviUsername(target.value)}
          promjenaLozinke={({ target }) => postaviPass(target.value)}
          userLogin={userLogin}
        />
    </Promjenjiv>
  )
}

  const proizvodForma = () => (
    <Promjenjiv natpis='Novi proizvod'>
      <ProizvodForma
        spremiProizvod={noviProizvod}
      />
    </Promjenjiv>
  )

      return (
            <CartProvider>
              <div className="container">
                {korisnik === null ? loginForma() : <div> <p>Prijavljeni ste kao: {korisnik.ime}</p> {proizvodForma()}</div>}
                <h1>Svi proizvodi</h1>
                    <div>
                    <div style={{paddingBottom: 10}}>
                      <Button onClick={() => postaviIspis(!ispisSve)}>
                      Prikaži { ispisSve ? "omiljene" : "sve"}
                      </Button>
                    </div>
                    </div>
                    <div className='row justify-content-center'>
                        {podaciZaIspis.map((item, index)=>{
                            return(
                                <Proizvodicard 
                                title={item.title} 
                                opis={item.opis} 
                                price={item.price} 
                                ducan={item.ducan}  
                                omiljen={item.omiljen}
                                promjenaOmiljen={() => promjenaOmiljenogProizvoda(item.id)}
                                brisiProizvod={()=>brisiProizvod(item.id)}
                                key={index}/>
                            )
                        })}
                    </div>
            </div>
              <div className="container">
                  <h1 className='text-center mt-3'>
                      Najjeftiniji proizvodi ili najjeftiniji - isti ducan
                  </h1>
                  <div>
                  <h1>{trg}</h1>
                  <input type="radio" name="trg" value="Plodine" onChange={e=>postaviTrg(e.target.value)} />Plodine
                  <input type="radio" name="trg" value="Lidl" onChange={e=>postaviTrg(e.target.value)} />Lidl
                  <input type="radio" name="trg" value="Konzum" onChange={e=>postaviTrg(e.target.value)} />Konzum
                  <input type="radio" name="trg" value="Najjeftiniji" onChange={e=>postaviTrg(e.target.value)}/>Najjeftiniji
                  </div>
                  <section className="py-4 container">
                      <div className='row justify-content-center'>
                          {arrayUniqueByKey.map((item, index)=>{
                              return(
                                  <Itemcard  
                                  title={item.title} 
                                  opis={item.opis} 
                                  price={item.price} 
                                  ducan={item.ducan}  
                                  item={item} 
                                  key={index}/>
                              )
                          })}
                      </div>
                  </section>
                  <PopisProizvoda />
              </div>
          </CartProvider>
      )
}

export default App;