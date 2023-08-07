import { motion } from "framer-motion";
import CenterCanvas from "../canvas/Center";
import SectionWrapper from "../hoc/SectionWrapper";
import { styles } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Cardv2 from "../components/Cardv2";
import { Tilt } from "react-tilt";
import has from "lodash";
import {  useDispatch, useSelector } from "react-redux";
import { getInitialPokemonData } from "../redux/reducers/getInitialPokemonData";

const Pokedex = () =>  {
  const [listPokes, setListPokes] = useState([]);
  const [searchPoke, setSearchPoke] = useState("");
  const [visible, setVisible] = useState(12);
  const [totalItem, setTotalItem] = useState(0);
  const dispatch = useDispatch();

  const showMoreItems = () => {
    setVisible((preVal) => preVal + 8);
  };
  const handleInputChange = (event) => {
    setSearchPoke(event.target.value);
  };
  const getPokemons = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=5000&offset=0")
      .then(({ data }) => setListPokes(data.results))
      .catch((error) => console.error(error));
  };

  const data = useSelector((state) => {
    console.log('state...', state.app);
    return state.app
  })



  

  async function handleSearch() {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchPoke}`
    );
    setTotalItem(data);
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getPokemons();
    dispatch(getInitialPokemonData());
  }, []);

  function filteredItems(filter) {
    if (filter === "highestNum") {
      let newArrPoke = has.orderBy(listPokes, ["name", "url"], ["desc", "asc"]);
      setListPokes(newArrPoke);
    } else if (filter === "lowestNum") {
      let newArrPoke = has.orderBy(listPokes, ["name", "url"], ["asc", "desc"]);
      setListPokes(newArrPoke);
    }
  }

  return (
    <section className="relative w-full h-fit mx-auto">
      <motion.div>
        <div
          className={`${styles.padding} bg-tertiary w-full relative h-fit rounded-lg`}
        >
                    <h2 className={`${styles.sectionHeadText} text-center`}>
            Start Looking for your pokemon!
          </h2>
          <CenterCanvas />
          <div className={``}>
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-around items-center">
                <div className="flex">
                  <div className="form__group field">
                    <input
                      required=""
                      placeholder="Name"
                      className="form__field"
                      type="input"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                    />
                    <label className="form__label" htmlFor="name">
                      Ex: pikachu
                    </label>
                  </div>
                </div>
                <select
                  id="orderSelect"
                  defaultValue={""}
                  onChange={(event) => filteredItems(event.target.value)}
                >
                  <option value="" disabled>
                    Default
                  </option>
                  <option value="lowestNum">A - Z</option>
                  <option value="highestNum">Z - A</option>
                </select>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 p-2 mb-10 mt-10">
                {totalItem ? (
                  <Tilt className="xs:w-[350px]">
                    <Cardv2 totalItem={totalItem} />
                  </Tilt>
                ) : (
                  data?.pokeList.slice(0, visible).map((pokemon) => (
                    <Tilt key={pokemon.name} className="xs:w-[350px]">
                      <Cardv2 url={pokemon?.url} />
                    </Tilt>
                  ))
                )}
                
              </div>

              <button
                className={`${totalItem ? "hidden" : "block"} btn`}
                onClick={() => showMoreItems()}
              >
                Cargar Mas
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(Pokedex, "");
