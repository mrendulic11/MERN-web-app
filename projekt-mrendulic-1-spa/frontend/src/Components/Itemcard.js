import React from 'react';
import { useCart } from 'react-use-cart';

const Itemcard= (props) => {
    const {addItem} = useCart();
    const { title, price, opis, ducan, item} = props 

    return (
        <div className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
            <div className='card p-0 overflow-hidden h-100 shadow'>
                    <div className='card-body text-center'>
                        <h5 className='card-title'>{title}</h5>
                        <h5 className='card-title'>{price} kn</h5>
                        <p className='card-text'>{opis}</p>
                        <p className='card-text'>{ducan}</p>
                        <button className='btn btn-success' 
                        onClick={()=>addItem(item)}>Dodaj na popis</button>
                    </div>
            </div>
        </div>
    )
}

export default Itemcard;