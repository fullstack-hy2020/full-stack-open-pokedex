



import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import App from '../src/App'

jest.mock('axios')

describe('<App />', () => {
    it('fetches data', async () => {
        // Mock the axios request with data
        axiosMock.get.mockResolvedValueOnce({
            data: {
                results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur', id: 1 }]
            }
        })

        // Rendering the app and waiting for the request to complete
        await act(async () => {
            render(<Router><App /></Router>)
        })

        // Make assertions
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
        expect(axiosMock.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=50')

        // Wait for the data to be displayed on the screen
        await waitFor(() => {
            expect(screen.getByText('bulbasaur')).toBeInTheDocument()
        })
    })

    it('shows error', async () => {
        // Mock rejected axios call
        axiosMock.get.mockRejectedValueOnce(new Error('Network Error'))

        // Rendering the app and waiting for the error
        await act(async () => {
            render(<Router><App /></Router>)
        })

        // Assert the error message is displayed
        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeVisible()
        })
    })
})
