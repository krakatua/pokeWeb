/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { pokeType } from "../constants";
import logo from '../assets/025.png';

function Cardv2({ url, totalItem }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true)
  const getPokemon = async () => {
    await axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.error(error));
      setLoading(false)
  };
  useEffect(() => {
    getPokemon();
  }, []);

  const colorVariants = {
    blue: "bg-blue-600 text-white",
    red: "bg-red-500",
    yellow: "bg-yellow-300",
    green: "bg-green-600",
    purple: "bg-purple-600",
    gray: "bg-neutral-900",
    slate: "bg-slate-500",
    cerulean: "bg-cerulean-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    brown: "bg-amber-800",
    lightblue: "bg-blue-300",
    lightgreen: "bg-green-400",
    lightpink: "bg-pink-300",
    lightRed: "bg-light-red-500",
    goldenrod: "bg-yellow-800",
    graylight: 'bg-gray-400'
  };

  return (
    <Link to={`/pokemon/${pokemon?.name || totalItem?.name}`}>
      {url ? (
        <div className="CardPoke border rounded-tl-lg">
         
            <img
              src={pokemon?.sprites?.other.home.front_default || logo}
              alt={pokemon?.name}
            />
          
          <h3 className={`text-gray-400 text-[12px] ml-1`}>#{pokemon?.id}</h3>
          <span className="m-1">{pokemon?.name}</span>
          <span className="text-[10px] flex gap-2 ">
            {pokemon?.types.map(({ type, slot }) => {
              const typeColor = pokeType.find(
                (item) => item.name === type.name
              )?.color;

              return (
                <h4
                  id="pokeType"
                  className={`${colorVariants[typeColor]} p-1 m-1 rounded-md text-[16px]`}
                  key={slot}
                >
                  {type?.name}
                </h4>
              );
            })}
          </span>
        </div>
      ) : (
        <div className="CardPoke border rounded-tl-lg">
          <img
            src={totalItem?.sprites?.other.home.front_default}
            alt={totalItem?.name}
          />
          <h3 className={`text-gray-400 text-[12px]`}>#{totalItem?.id}</h3>
          <span>{totalItem?.name}</span>
          <span className="text-[10px] flex gap-2">
            {totalItem?.types.map(({ type, slot }) => {
              const typeColor = pokeType.find(
                (item) => item.name === type.name
              )?.color;

              return (
                <h4
                  id="pokeType"
                  className={`${colorVariants[typeColor]} p-1 m-1 rounded-md text-[16px]`}
                  key={slot}
                >
                  {type?.name}
                </h4>
              );
            })}
          </span>
        </div>
      )}
    </Link>
  );
}

export default Cardv2;
