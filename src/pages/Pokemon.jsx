import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion';
import { styles } from '../constants';
import LinesChart from '../components/LinesChart';
import { Tilt } from 'react-tilt';
import SectionWrapper from '../hoc/SectionWrapper';
import PokeEvolve from '../components/PokeEvolve';
import { pokemonTypes } from '../constants/pokemonTypes';

function Pokemon() {
  const {id} = useParams();
  const [poke, setPoke] = useState({})
  const [pokestats, setPokestats] = useState([]);
  const [species, setSpecies] = useState('');
  const [pokeType, setPokeType] = useState([])

  async function getPokeData () {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPoke(data)
    setSpecies(data?.species?.url)
  }
  console.log(poke)

  function compareTypes (types) {
    const newTypeObjs = types.map((type) => {
      const typeObj = pokemonTypes[type];
      return { ...typeObj, id: type };
    });
    setPokeType(newTypeObjs);
}

  useEffect(() => {
    async function fetchData() {
      await getPokeData();

    }
    fetchData()
  }, [id])
  useEffect(() => {
    // Cuando cambia 'poke', actualizamos 'pokestats' con las estadísticas
    setPokestats(poke?.stats || []);
  }, [poke]);
  useEffect(() => {
    if (poke?.types) {
      const types = poke.types.map((type) => type.type.name);
      compareTypes(types);
    }
  }, [poke]);

  



  return (
    <section className='relative w-full h-screen mx-auto'>
      <motion.div
       className='mt-10'>
        <div className={`${styles.padding} bg-tertiary w-full relative h-fit rounded-lg`}>
        <h1 className='w-full text-center text-[24px] uppercase'>{poke?.name} <span className='text-[16px] text-gray-400'>#{poke?.id}</span></h1>
          <div className='w-[100%] flex flex-wrap md:flex-nowrap gap-2'>
            <div className='border w-full flex flex-col items-center'>
              <div>
                <Tilt>
                <img 
              src={poke?.sprites?.other?.home?.front_default} alt={poke?.name}
              className='w-[350px]'/>
                </Tilt>
                  
              </div>
              
              <div className='w-full '>
                
                <div className={`w-full max-h-[300px] p-2 ${styles.padding} bg-primary`}>
                <h1 className={`${styles.sectionSubText}`}>Stats</h1>
                <LinesChart pokestats={pokestats} pokemon={poke?.name}/>
                </div>
              </div>
            </div>
            <div className='border w-full h-[650px]'>
              <div className=''>
                <h2 className={`${styles.sectionSubText}`}>Details</h2>
                <div className={`${styles.padding} flex gap-2  bg-primary w-full p-1`}>
                  <div className='w-full'>
                    <p>Height: {poke?.height}</p>
                    <p>Weight: {poke?.weight}</p>

                  </div>
                  <div className='w-full'>
                    <p>Base experience: {poke?.base_experience}</p>
                    <p>Abilities: {poke?.abilities?.map((abil, slot) => (
                    <p key={slot}> {abil?.ability.name}</p>
                    ))} </p>
                    
                  </div>
                </div>
              </div>
                  <PokeEvolve id={species}/>
                  {
                    poke?.types?.map((ele) => (
                    
                    <div key={ele.id}>
                      <h1 className='pokeType'>{ele.type.name}</h1>
                      {
                        pokeType.map((ele) => (
                          <div key={ele.id}>
                          <img className='w-[50px]' src={ele.image} slot={ele.id}/>
                          <ul>
                            <li>Resistence: {ele.resistance.join(', ')}</li>
                            <li>Strength: {ele.strength.join(', ')} </li>
                            <li>Vulnerable: {ele.vulnerable.join(', ')}</li>
                            <li>Weakness: {ele.weakness.join(', ')}</li>
                          </ul>
                          </div>
                        ))
                      }
                    </div>
                    
                    ))
                  }
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionWrapper(Pokemon, '')

 