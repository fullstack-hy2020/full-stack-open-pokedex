import React from 'react'
import PropTypes from "prop-types"; // Import PropTypes


const PokemonAbility = ({ abilityName }) => (
  <div className="pokemon-ability">
    <div className="pokemon-ability-type">Hidden ability</div>
    <div className="pokemon-ability-name">
      {abilityName}
    </div>
  </div>
)

export default PokemonAbility
PokemonAbility.propTypes = {
  abilityName: PropTypes.string
}