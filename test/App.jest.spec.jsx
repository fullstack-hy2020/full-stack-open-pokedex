import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import { act } from "react"
import "@testing-library/jest-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "../src/App"

jest.mock("axios")

describe("<App />", () => {
  it("fetches data", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        results: [{ url: "https://pokeapi.co/api/v2/pokemon/1/", name: "bulbasaur", id: 1 }]
      }
    })

    // Use act here
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      )
    })

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/?limit=50")
    })
  })

  it("shows error", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"))

    // Use act here as well
    await act(async () => {
      render(
        <Router>
          <App />
        </Router>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument()
    })
  })
})