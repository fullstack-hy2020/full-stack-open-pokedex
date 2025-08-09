import       React       ,       { useState, useEffect }               from          "react" 
import axios from "axios" 
import config from "./config"

const App = () => {
  const [pokemon, setPokemon] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/api/pokemon`)
      .then(response => setPokemon(response.data.results))
      .catch(e => setError(e))
  }, [])

  return (
    <div>
      <h1>Pokedex</h1>
      {error && (
        <div data-testid="error">
          Virhe tapahtui API-kutsussa
        </div>
      )}
      <ul>
        {pokemon.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
