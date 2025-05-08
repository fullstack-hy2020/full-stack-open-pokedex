import React from 'react'
import { render, screen } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../src/App'

jest.mock('axios')

const originalWarn = console.warn
beforeAll(() => {
  console.warn = (...args) => {
    if (
      args[0]?.includes('React Router Future Flag Warning')
    ) return
    originalWarn(...args)
  }
})

afterAll(() => {
  console.warn = originalWarn
})

describe('<App />', () => {
  it('fetches data', async () => {
    axiosMock.get.mockResolvedValueOnce(
      {
        data: {
          results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur', id: 1 }]
        }
      }
    )
    await act(async () => {
      render(<Router><App/></Router>)
    })
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=50')
  })

  it('shows error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error())
    await act(async () => {
      render(<Router><App/></Router>)
    })
    expect(screen.getByTestId('error')).toBeVisible()
  })

})
