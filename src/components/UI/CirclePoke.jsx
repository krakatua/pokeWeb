import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import logo from '../../assets/025.png'

const CirclePoke = ({url}) => {

const [linkEvo, setLinkEvo] = useState({})

async function getLinkTree() {
    await axios
        .get(url)
        .then(({ data }) => setLinkEvo(data?.chain))
        .catch((error) => console.error(error));
}
useEffect(() => {
    getLinkTree();
  }, []);
  console.log(linkEvo)

  

  return (
    <div className='flex flex-col'>
      <h1>Pokemon Evolution Tree</h1>
      <div className='flex'>

      
    <div className='w-[33%] h-[150px] border-4 border-gray-500 bg-gray-900 rounded-[50%] m-2'>
      <img src={logo}/> 

    </div>
    <div className='w-[33%] h-[150px] border-4 border-gray-500 bg-gray-900 rounded-[50%] m-2'>
      <img src={logo}/> 

    </div>
    <div className='w-[33%] h-[150px] border-4 border-gray-500 bg-gray-900 rounded-[50%] m-2'>
      <img src={logo}/> 

    </div>
    </div>
    </div>
  )
}




CirclePoke.propTypes = {
  url: PropTypes.string.isRequired,
  };

export default CirclePoke