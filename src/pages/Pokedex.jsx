import { motion } from "framer-motion";
import CenterCanvas from "../canvas/Center";
import SectionWrapper from "../hoc/SectionWrapper";
import { AiOutlineSearch } from "react-icons/ai";
import { styles } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Cardv2 from "../components/Cardv2";
import { Tilt } from "react-tilt";

const Pokedex = () => {
  const [listPokes, setListPokes] = useState([]);
  const [searchPoke, setSearchPoke] = useState("");
  const [visible, setVisible] = useState(12);
  const [totalItem, setTotalItem] = useState(0);

  const showMoreItems = () => {
    setVisible((preVal) => preVal + 8);
  };
  const handleInputChange = (event) => {
    setSearchPoke(event.target.value);
  };
  const getPokemons = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0")
      .then(({ data }) => setListPokes(data.results))
      .catch((error) => console.error(error));
  };

  async function handleSearch() {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${searchPoke}`
    );
    setTotalItem(data);
  }
  console.log(totalItem);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  function filteredItems(filter) {
    if (filter === 'lowestNum') {
      highestnum = sorted()
    }
    if (filter === 'highestNum') {
      return listPokes.sort((a, b) => b.id - a.id);
    }
    if (filter === 'a-z') {
      return listPokes.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (filter === 'z-a') {
      return listPokes.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  console.log(filteredItems())

  return (
    <section className="relative w-full h-screen mx-auto">
      <motion.div>
        <div
          className={`${styles.padding} bg-tertiary w-full relative h-fit rounded-lg`}
        >
          <h2 className={`${styles.sectionSubText} text-center`}>
            Start Looking for your pokemon!
          </h2>
          <div className={``}>
            <div className="flex flex-col items-center">
              <div className="">
                <div>
                  <input
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    type="text"
                  />
                  <AiOutlineSearch />
                </div>
                <select
                  id="filter-items"
                  defaultValue={""}
                  onChange={(event) => filteredItems(event)}
                >
                  <option value="" disabled>
                    Default
                  </option>
                  <option value="lowestNum">Lowest Number</option>
                  <option value="highestNum">Highest Number</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
              <div className="border-2 flex flex-wrap justify-center items-center gap-2 p-2">
                {listPokes?.slice(0, visible).map((pokemon) => (
                  <Tilt key={pokemon.name} className="xs:w-[350px]">
                    <Cardv2 url={pokemon?.url} />
                  </Tilt>
                ))}
              </div>
              <button
                className={`text-center w-fit p-2 bg-blue-900 button_secondary `}
                onClick={() => showMoreItems()}
              >
                Cargar Mas
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <CenterCanvas />
    </section>
  );
};

export default SectionWrapper(Pokedex, "");
