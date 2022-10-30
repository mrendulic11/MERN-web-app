import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Proizvodicard from './Proizvodicard'
 
test('renderira sadrzaj', () => {
    const title = "Jagode" 
    const price = 15
    const opis = "Vrgoracke" 
    const ducan = "Lidl"
    const omiljen = true
 
  const komponenta = render(
    <Proizvodicard title={title} price={price} opis={opis} ducan={ducan} omiljen={omiljen} />
  )

  /* komponenta.debug() */
 
  expect(komponenta.container).toHaveTextContent('Jagode')
})

	
test('klik poziva event handler', () => {
    const title = "Jagode" 
    const price = 15
    const opis = "Vrgoracke" 
    const ducan = "Lidl"
    const omiljen = true
   
    const testHandler = jest.fn()
   
    const komponenta = render(
        <Proizvodicard title={title} price={price} opis={opis} ducan={ducan} omiljen={omiljen} promjenaOmiljen={testHandler} />
    )
    const button = komponenta.getByText('označi kao nije omiljen')
    fireEvent.click(button)
   
    expect(testHandler.mock.calls).toHaveLength(1)
  })