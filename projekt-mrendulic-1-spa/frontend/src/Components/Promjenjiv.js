import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
 
const Promjenjiv = (props) => {
    const [vidljivo, postaviVidljivo] = useState(false)
 
    const sakrij = { display: vidljivo ? 'none' : '' }
    const prikazi = { display: vidljivo ? '' : 'none' }
 
    const promjenaVidljivosti = () => {
        postaviVidljivo(!vidljivo)
    }
 
    return (
        <div>
          <div style={sakrij}>
            <Button onClick={promjenaVidljivosti}>{props.natpis}</Button>
          </div>
          <div style={prikazi} className='promjenjiviSadrzaj'>
            {props.children}
            <Button onClick={promjenaVidljivosti} type="reset">Odustani</Button>
          </div>
        </div>
        )
}
export default Promjenjiv