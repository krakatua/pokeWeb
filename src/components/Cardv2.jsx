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

    const spanType = document.getElementById('pokeType')
    const typePoke = spanType?.textContent.trim();

    function getColorFromName(name) {
      const foundType = pokeType.find((type) => type.name === name);
      return foundType ? foundType.color: null;
    }
    
    const color2 = getColorFromName(typePoke);

  return (
    <Link to=''>
    <div className="CardPoke">
      <img src={pokemon?.sprites?.other.home.front_default} alt={pokemon?.name}/>
      <h3 className={`text-gray-400 text-[12px]`}>#{pokemon?.id}</h3>
      <span>{pokemon?.name}</span>
      <span className="text-[10px]">{pokemon?.types.map(({ type, slot }) => (
            <h4 id='pokeType' className={`bg-[#${color2 ? color2 : ''}] text-md`} key={slot}>{type?.name} </h4>
          ))}</span>
    </div>
    </Link>
  )
}

export default Cardv2