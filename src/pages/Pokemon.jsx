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
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { db, pokemonListRef } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../redux/reducers/modalSlice';
import { toast } from 'sonner';

function Pokemon() {
  const {id} = useParams();
  const [poke, setPoke] = useState({})
  const [pokestats, setPokestats] = useState([]);
  const [species, setSpecies] = useState('');
  const [pokeType, setPokeType] = useState([])
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  

  async function getPokeData () {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPoke(data)
    setSpecies(data?.species?.url)
  }
  function compareTypes (types) {
    const newTypeObjs = types.map((type) => {
      const typeObj = pokemonTypes[type];
      return {...typeObj, id: type };
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

  
async function addPokeList () {

  if (!user) {
    dispatch(openLoginModal())
    return
  }


  await addDoc(
    pokemonListRef, {
      uid: poke?.id,
      pokemon: {
        id: poke?.id,
        name: poke?.name,
        pictures: poke?.sprites,
        types: poke?.types
      },
      email: user.email,
    }
  )

  
}




  return (
    <section className='relative w-full h-auto mx-auto'>
      <motion.div
       className='mt-10'>
        <div className={`${styles.padding} bg-tertiary w-full relative h-fit rounded-lg`}>
        <h1 className='w-full text-center text-[24px] uppercase'>{poke?.name} <span className='text-[16px] text-gray-400'>#{poke?.id}</span></h1>
          <div className='w-[100%] flex flex-wrap gap-5'>
            <div className='w-full flex flex-col items-center'>
              <div>
                <Tilt>
                <img 
              src={poke?.sprites?.other?.home?.front_default} alt={poke?.name}
              className='w-[350px]'/>
                </Tilt>
                  
              </div>
              
              <div className='w-full '>
                
                <div className={`w-full max-h-[300px] p-2 ${styles.padding}`}>
                <h1 className={`${styles.sectionSubText}`}>Stats</h1>
                <LinesChart pokestats={pokestats} pokemon={poke?.name}/>
                </div>
              </div>
            </div>
            <div className='w-full h-[650px]'>
              <div className=''>
                <h2 className={`${styles.sectionSubText}`}>Details</h2>
                <button
                onClick={addPokeList}
                className='border p-2'>Add to your list</button>
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
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SectionWrapper(Pokemon, '')

 