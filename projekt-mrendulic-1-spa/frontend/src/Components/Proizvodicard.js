import React from 'react';

const Proizvodicard= (props) => {
    const { title, price, opis, ducan, omiljen, promjenaOmiljen, brisiProizvod} = props;

    const pomocna=(omiljen)=>{
        if (omiljen===true)
        {
            return "Da"
        }
        else{
            return "Ne"
        }
      }

    const oznaka = omiljen
  ? 'označi kao nije omiljen' : 'označi kao omiljen'

    return (
        <div className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
            <div className='card p-0 overflow-hidden h-100 shadow'>
                    <div className='card-body text-center'>
                        <h5 className='card-title'>{title}</h5>
                        <h5 className='card-title'>{price} kn</h5>
                        <p className='card-text'>{opis}</p>
                        <p className='card-text'>{ducan}</p>
                        <p className='card-text'>Omiljen: {pomocna(omiljen)}</p>
                        <button onClick={promjenaOmiljen}>{oznaka}</button>
                        <button onClick={brisiProizvod}><span role="img" aria-label="delete">❌</span></button>
                    </div>
            </div>
        </div>
    )
}

export default Proizvodicard;