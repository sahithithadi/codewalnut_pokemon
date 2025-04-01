import React, { useState } from "react";
import { Modal } from "@mui/material";
import Poki from "./page";
import Image from "next/image";

const Pokemon = async ({ name }) => {
  const [poki, setPoki] = useState({
    name: "",
    id: "",
    type: "",
    species: "",
    stats: [],
    abilities: [],
    image: "",
  });

  const redirectPoki = async () => {
    axios
      .get(`${baseUrl}${pokiSearch}`)
      .then((res) => {
        let data = res.data;
        setPoki({
          name: data.name,
          id: data.id,
          type: data.types[0].type.name,
          species: data.species.name,
          stats: data.stats,
          abilities: data.abiities,
          image: data.sprites.front_default,
        });
      })
      .catch((err) => {
        console.log(err);
        return { data: [], error: true, error_message: "Pokemon not found !" };
      });
  };

  //   useEffect(() => redirectPoki(name), [name]);

  return (
    <div>
      <h1>{Poki.name}</h1>
      <Image src={Poki.image} />
    </div>
  );
};

export default Pokemon;
