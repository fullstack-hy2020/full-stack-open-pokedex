import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const PokemonList = ({ pokemonList }) => {
  return (
    <div>
      <h2 className="pokedex-title">Pokedex lists</h2>
      <p className="pokedex-desc">pokedexs with their detail properties</p>
      <div className="list-container">
        {pokemonList.map(({ id, name }) => (
          <Link
            key={id}
            to={`/pokemon/${name}`}
            className="list-item"
            style={{
              backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`})`,
            }}
          >
            <div className="list-item-name">{name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;

PokemonList.propTypes = {
  pokemonList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // id should be a number
      name: PropTypes.string.isRequired, // name should be a string
    })
  ).isRequired, // Ensures pokemonList is required
};
