/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { pokeType } from '../constants';

function Cardv2({url}) {

    const [pokemon, setPokemon] = useState(null);
    const getPokemon = async () => {
      await axios
        .get(url)
        .then(({ data }) => setPokemon(data))
        .catch((error) => console.error(error));
    };
    useEffect(() => {
      getPokemon();
    }, []);

    console.log(pokemon)

    const colorVariants = {
      blue: 'bg-blue-600 hover:bg-blue-500 text-white',
      red: 'bg-red-500 hover:bg-red-400 text-white',
      yellow: 'bg-yellow-300 hover:bg-yellow-400 text-black',
    }

  return (
    <Link to={`/pokemon/${pokemon?.name}`}>
    <div className="CardPoke">
      <img src={pokemon?.sprites?.other.home.front_default} alt={pokemon?.name}/>
      <h3 className={`text-gray-400 text-[12px]`}>#{pokemon?.id}</h3>
      <span>{pokemon?.name}</span>
      <span className="text-[10px] flex gap-2">
        {pokemon?.types.map(({ type, slot }) => {
          const typeColor = pokeType.find((item) => item.name === type.name)?.color;

          return (
            <h4
            id='pokeType'
            className={`bg-[${colorVariants[typeColor]}] text-md border-2 p-1`}
            key={slot}>
              {type?.name}
            </h4>
          )
            
          })}</span>
    </div>
    </Link>
  )
}

export default Cardv2