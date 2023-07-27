import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { styles } from "../constants";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { pokemon } from "../constants";

const Featured = ({ index }) => {
  const [pokemons, setPokemons] = useState([]);
  

  function lowerCase(pokemon) {
    return pokemon.map(
      (pokemon) => pokemon.charAt(0).toLowerCase() + pokemon.slice(1)
    );
  }
  const pokeLower = lowerCase(pokemon);
  function getArr(pokeLower, count) {
    return pokeLower.sort(() => Math.random() - 0.5).slice(0, count);
  }
  const pokeRandom = getArr(pokeLower, 10);

  async function pokeData() {
    const poke = []
    for (const name of pokeRandom) {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
            poke.push(data)
        
      } catch (error) {
        console.error(`Error for ${name}`);
      }
    }

    setPokemons(poke);
  }
  useEffect(() => {
    setPokemons([]);
    pokeData();
  }, []);
  
  console.log(pokemons)

  
  

  return (
    <>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className={`${styles.paddingX} m-auto w-fit  p-[1px] rounded-[20px]`}
      >
        <Carousel margin={10} nav
        infiniteLoop={true}
        thumbWidth={100}
        className="w-full">{
            pokemons.map((poke) => (
                <img key={poke.id} src={poke.sprites.front_default}/>
            ))
            }</Carousel>
      </motion.div>
    </>
  );
};

export default Featured;
