import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import PokemonList from '../src/PokemonList'

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

const pokemonList = [{
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  name: 'bulbasaur',
  id: 1
}, {
  url: 'https://pokeapi.co/api/v2/pokemon/133/',
  name: 'eevee',
  id: 133
}]

describe('<PokemonList />', () => {
  it('should render items', () => {
    render(
      <BrowserRouter>
        <PokemonList pokemonList={pokemonList} />
      </BrowserRouter>
    )
    expect(screen.getByText('bulbasaur')).toBeVisible()
    expect(screen.getByText('eevee')).toBeVisible()
  })
})
