import React from 'react';
import { useCart } from 'react-use-cart';
import {Table} from 'react-bootstrap';

const PopisProizvoda = () => {
    const { 
        isEmpty, 
        totalUniqueItems, 
        items, 
        totalItems,
        cartTotal,
        updateItemQuantity, 
        removeItem,
        emptyCart, } = useCart();
    
    if (isEmpty) return <h1 className='text-center'>Popis proizvoda je prazan!</h1>
    return (
        <section className='py-4 container'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    <h5>Broj različitih proizvoda: ({totalUniqueItems})</h5> 
                    <h5>Ukupno proizvoda: ({totalItems})</h5>
                    <table className='table table-light table-hover m-0'>
                        <tbody>
                            {items.map((item, index)=>{
                                return (
                                        <Table striped>
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>{item.price} kn</td>
                                            <td>{item.ducan}</td>
                                            <td>Količina: ({item.quantity})</td>
                                            <td>
                                                <button 
                                                    className='btn btn-info ms-2'
                                                    onClick={() => updateItemQuantity(item.id, item.quantity -1 )}>-</button>
                                                <button 
                                                className='btn btn-info ms-2'
                                                onClick={() => updateItemQuantity(item.id, item.quantity +1 )}>+</button>
                                                <button 
                                                    className='btn btn-info ms-2'
                                                    onClick={()=> removeItem(item.id)}>Obriši proizvod</button>
                                            </td>
                                        </tr>
                                        </Table>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='col-auto ms-auto'>
                    <h2>Ukupna cijena: {cartTotal} kn</h2>
                </div>
                <div className='col-auto'>
                    <button className='btn btn-danger m-2'
                    onClick={()=> emptyCart()}>Očisti popis</button>
                </div>
            </div>
        </section>
    )
}

export default PopisProizvoda;