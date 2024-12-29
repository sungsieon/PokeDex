import { useEffect, useState } from "react";
import "../css/Pokedex.css";
import axios from "axios";
import React from "react";

export default function Pokedex({ changeLanguage, changeBright, inputValue }) {
  const [data, setData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151"
        );
        const pokeData = response.data;
        const pokemonUrls = response.data.results;
        const pokemonData = [];
        setData(pokeData);

        for (let i = 0; i < pokemonUrls.length; i++) {
          const pokemonDetails = await axios.get(pokemonUrls[i].url);
          const { name, sprites, types, abilities } = pokemonDetails.data;

          const speciesDetails = await axios.get(
            pokemonDetails.data.species.url
          );
          const koreanName =
            speciesDetails.data.names.find(
              (nameObj) => nameObj.language.name === "ko"
            )?.name || name;

          pokemonData.push({
            name,
            koname: koreanName,
            image: sprites.front_default, // 포켓몬 이미지
            types: types.map((type) => type.type.name), // 포켓몬 타입
            abilities: abilities.map((ability) => ability.ability.name), // 포켓몬 능력
          });
        }

        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterPokemon = pokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      pokemon.koname.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const pokedexBox = filterPokemon.map((pokemon, index) => {
    const num = index + 1;

    return (
      <>
        <div className={changeBright ? "blackBox" : "pokedexBox"}>
          <span className={changeBright ? "blackNumber" : "whiteNumber"}>
            no.{num}
          </span>
          <br></br>
          <h1 className={changeBright ? "whiteName" : "pokeName"}>
            {changeLanguage ? pokemon.koname : pokemon.name}
          </h1>
          <div className="typeBox">
            {pokemon.types.map((type, key) => (
              <span key={key} className="type">
                {type}
              </span>
            ))}
          </div>
          <img className="Image" src={pokemon.image} />
        </div>
      </>
    );
  });

  return (
    <>
      <div className="pokedex">{pokedexBox}</div>
    </>
  );
}
