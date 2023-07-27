/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState} from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../constants";
import {Swiper as SwiperComponent, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Card from "./Card";
import { Tilt } from "react-tilt";
import SectionWrapper from '../hoc/SectionWrapper'


// eslint-disable-next-line react-refresh/only-export-components
const Featured = ({ index }) => {
  const [pokemons, setPokemons] = useState([]);
  

  const getPokemons = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10&offset=64")
      .then(({ data }) => setPokemons(data.results))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPokemons();
  }, []);

  console.log(pokemons);

  return (
    <>
      <motion.div
    variants={textVariant()}
    >
      
      <h2 className={`${styles.sectionHeadText} text-center`}>
        Start checking out these pokemons
      </h2>
    </motion.div>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className={`${styles.paddingX} m-auto p-[1px] rounded-[20px]
        flex flex-col items-center`}
      >
        <div className="container">
        <div className="swiperContainer">
          <SwiperComponent
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{
              el: ".pagination",
              clickable: true,
            }}
            slidesPerView={4}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              "@0.50": {
                slidesPerView: 1.25,
                spaceBetween: 25,
              },
              "@1.00": {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              "@1.25": {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              "@1.50": {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              "@1.75": {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {pokemons?.map((pokemon) => (
              <SwiperSlide key={pokemon?.url}>
                <Tilt className="xs:w-[350px]">
                <Card url={pokemon?.url} />
                </Tilt>
                
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
        </div>
        <button className={`w-fit rounded-md 
        p-5 outline-none font-bold shadow-md shadow-primary 
        bg-tertiary button_secondary hover:scale-105 transition-all
        ${styles.sectionSubText}`}>Go to the pokedex!</button>
      </motion.div>
      
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Featured, 'featured')
