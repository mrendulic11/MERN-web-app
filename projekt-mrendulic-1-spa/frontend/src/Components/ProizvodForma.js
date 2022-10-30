import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

/*<button type="submit">Spremi</button>*/

const ProizvodForma = (props) => {
    const [ unosProizvoda, postaviUnos] = useState('unesi proizvod...');
    const [ unosOpisa, postaviOpis] = useState('unesi opis...');
    const [ unosCijene, postaviCijenu] = useState('unesi cijenu...');
    const [ unosDucana, postaviDucan] = useState('unesi trgovinu...');

    const promjenaUnosa = (e) => {
        console.log(e.target.value);
        postaviUnos(e.target.value)
      }
    
      const promjenaOpisa = (e) => {
        console.log(e.target.value);
        postaviOpis(e.target.value)
      }
    
      const promjenaCijene = (e) => {
        console.log(e.target.value);
        postaviCijenu(e.target.value)
      }
    
      const promjenaDucana = (e) => {
        console.log(e.target.value);
        postaviDucan(e.target.value)
      }

      const noviProizvod = (e) => {
        e.preventDefault()
        console.log('Klik', e.target)
        props.spremiProizvod ({
          title: unosProizvoda,
          opis: unosOpisa,
          price: unosCijene,
          ducan: unosDucana, 
          omiljen: Math.random() > 0.5    
        })
        postaviUnos('unesi proizvod...');
        postaviOpis('unesi opis...');
        postaviCijenu('unesi cijenu...');
        postaviDucan('unesi trgovinu...');
    }

    return (
        <div className='formaDiv'>
            <h2>Unos novog proizvoda</h2>
            <Form onSubmit={noviProizvod}>
                <div style={{padding: 5}}>
                <Form.Control type="text" value={unosProizvoda} onChange={promjenaUnosa} />
                </div>
                <div style={{padding: 5}}>
                <Form.Control type="text" value={unosOpisa} onChange={promjenaOpisa} />
                </div>
                <div style={{padding: 5}}>
                <Form.Control type="number" value={unosCijene} onChange={promjenaCijene} />
                </div>
                <div style={{padding: 5}}>
                <Form.Control type="text" value={unosDucana} onChange={promjenaDucana} />
                </div>
                <div style={{padding: 5}}>
                <Button variant="primary" type="submit">Spremi</Button>
                </div>
            </Form>
        </div>
    )
}
export default ProizvodForma