import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import CirclePoke from './UI/CirclePoke';

const PokeEvolve = ({species}) => {

    const [evolveChain, setEvolveChain] = useState();
    console.log(species)

    async function getEvolves() {
      
       try {
        const { data } = await axios.get(species);
        setEvolveChain(data?.evolution_chain?.url);
    } 
    catch (error) {
        // Manejar el error de alguna forma, como mostrar un mensaje de error o registrar el error
        console.error('Error en la solicitud:', error);
      }
    }
    console.log(evolveChain)
    
      useEffect(() => {
        // Verificar si el valor de species está almacenado en localStorage
        const storedSpecies = localStorage.getItem('species');
    
        if (storedSpecies) {
          // Si hay un valor almacenado, utilizarlo en lugar de la prop species
          getEvolves(storedSpecies);
        } else {
          // Si no hay un valor almacenado, utilizar la prop species y guardarlo en localStorage
          getEvolves(species);
          localStorage.setItem('species', species);
        }
      }, []);
      console.log(evolveChain)

     
      

      

  



  return (
    <div>
        <CirclePoke url={evolveChain}/>
    </div>
  )
}

PokeEvolve.propTypes = {
    species: PropTypes.string.isRequired,
  };

export default PokeEvolve


