import { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import axios from 'axios';
import { pokemonRoute } from '../../constants';

function Circle({url}) {
    const [evoTree, setEvoTree] = useState([])
    const getPokemon = async () => {
        const {data} = await axios
          .get(`${pokemonRoute}/${url}`)
          setEvoTree(data)
      };
    
      useEffect(() => {
        getPokemon();
      }, [url]);
      console.log(evoTree)
  return (
    <div className='w-[33%] h-[150px] border-4 border-gray-500 bg-gray-900 rounded-[50%] m-2 flex items-center justify-center'>
      <img src={evoTree?.sprites?.other.home.front_default} className='w-[80%]'/> 
    </div>
  )
}

Circle.propTypes = {
    url: PropTypes.string.isRequired,
    };
  

export default Circle