	
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ProizvodForma from './ProizvodForma'
 
test('<ProizvodForma> poziva onSubmit i mijenja stanje roditelja', () =>{
  const stvoriProizvod = jest.fn()
 
  const komponenta = render(
    <ProizvodForma spremiProizvod={stvoriProizvod} />
  )
 
  const input = komponenta.container.querySelector('input')
  const forma = komponenta.container.querySelector('form')
 
  fireEvent.change(input, {
    target: {value: 'Kupine'}
  })
  fireEvent.submit(forma)
 
  expect(stvoriProizvod.mock.calls).toHaveLength(1)
  console.log(stvoriProizvod.mock.calls)
  expect(stvoriProizvod.mock.calls[0][0].title).toBe('Kupine')
})