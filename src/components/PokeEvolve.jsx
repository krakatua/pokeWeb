import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import CirclePoke from './UI/CirclePoke';
import { pokemonsEvoChain } from '../constants';
import logo from './../assets/025.png'

const PokeEvolve = ({id}) => {
    const [evolveTree, setEvolveTree] = useState({})
    async function getEvolveTree() {
      const {data} = await axios.get(id)
      setEvolveTree(data);
    }
    useEffect(() => {
      getEvolveTree();
    }, [id])
    console.log(evolveTree)

    const getSpecies = () => {

    }

  return (
    <div>
      
        <CirclePoke  url={evolveTree?.evolution_chain?.url}/>
    </div>
  )
}

PokeEvolve.propTypes = {
    id: PropTypes.string.isRequired,
  };

export default PokeEvolve


