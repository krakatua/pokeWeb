import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

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

  

  return (
    <div>{url}</div>
  )
}




CirclePoke.propTypes = {
    species: PropTypes.string.isRequired,
  };

export default CirclePoke