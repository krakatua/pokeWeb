import { signOut } from "firebase/auth";
import React from "react";
import { auth, db, firebaseDB, pokemonListRef } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/reducers/userSlice";
import {
  closeLoginModal,
  closePokemonModal,
  closeSignupModal,
  openPokemonModal,
} from "../redux/reducers/modalSlice";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import SectionWrapper from "../hoc/SectionWrapper";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";

function Mylist() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [pokeList, setPokeList] = useState([]);
  const isOpen = useSelector((state) => state.modals.pokemonModalOpen)

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser);
    dispatch(closeSignupModal());
    dispatch(closeLoginModal());
  }

  function getData() {
    const q = query(
      collection(db, "pokemonList", "pokemons", "list"),
      where("email", "==", `${user.email}`)
    );
    return onSnapshot(q, (snapshot) => {
      const pokeList = [];
      snapshot.forEach((doc) => {
        pokeList.push(doc.data());
      });

      setPokeList(pokeList);
    });
  }

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <section className="mt-20 flex flex-wrap gap-10 justify-center">
      <motion.div className="border w-[200px] h-[500px] rounded-md">
        <div className="flex flex-col items-center gap-5 mt-5">
          <picture className="border text-center flex justify-center items-center w-[150px] h-[150px] rounded-full">
            userPicture
          </picture>
          <h1>{user?.name}</h1>
          <br />
          <h1>Amount of pokemons: {pokeList.length}</h1>
          <select className="w-full"></select>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </motion.div>
      <motion.div className="border w-[500px] h-[500px]">
        <div className="flex flex-wrap gap-5 p-3">
        <ul
         className="flex flex-wrap gap-5 items-center" >
        {pokeList.map((poke) => (
          
          <li key={poke.id}
          className="shadow-inner">
              <button onClick={() => dispatch(openPokemonModal())}>
              <picture className="w-[50px]">
                <img
                  className="w-[50px] bg-[#333638] border-2 border-[#1E1E1E] rounded-sm p-1"
                  src={`${poke.pokemon.pictures.other.home.front_default}`}
                  />
              </picture>
              </button>
            </li>
            ))}
            </ul>
        </div>
      </motion.div>

      <Modal
      open={isOpen}
      onClose={() => dispatch(closePokemonModal())}
      className="flex justify-center items-center">
        <div
        className="bg-[#333638]">
          <picture>
            <img src={``}/>
          </picture>
        </div>
      </Modal>
    </section>
  );
}

export default SectionWrapper(Mylist);
