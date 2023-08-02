import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { motion } from 'framer-motion';

function Pokemon() {
  const {id} = useParams();
  const [poke, setPoke] = useState({})
  async function getPokeData () {
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPoke(data)
  }
  useEffect(() => {
    getPokeData();
  }, [])
  
  
  return (
    <section className='relative w-full h-screen mx-auto'>
      <motion.div
      className='relative w-[500px] border h-[500px]'>
        <div>
          {poke?.name}
        </div>
      </motion.div>
    </section>
  )
}

export default Pokemon

 