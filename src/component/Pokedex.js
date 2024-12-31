import { useEffect, useState } from "react";
import "../css/Pokedex.css";
import axios from "axios";
import React from "react";

export default function Pokedex({ changeLanguage, changeBright, inputValue }) {
  const [data, setData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [inner, setInner] = useState(true);

  //pokemon API
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
            image: sprites.front_default,
            types: types.map((type) => type.type.name),
            abilities: abilities.map((ability) => ability.ability.name),
            back_default: sprites.back_default,
          });
        }

        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //-------------------------------------------------------------------------------

  // pokeBox
  const filterPokemon = pokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      pokemon.koname.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const pokedexBox = filterPokemon.map((pokemon, index) => {
    const num = index + 1;

    const pokeBoxClick = (pokemon, index) => {
      const updatedPokemon = { ...pokemon, num };
      setSelectedPokemon(updatedPokemon);
      setInner(true);
    };

    return (
      <>
        <div
          onClick={() => pokeBoxClick(pokemon)}
          className={changeBright ? "blackBox" : "pokedexBox"}
        >
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
  //--------------------------------------------------------------------------

  //innerBox

  const handleBtn = () => {
    setInner(false);
  };

  const innerBox = selectedPokemon ? (
    <div className={inner ? "fullBox" : "hidden"}>
      <div className="innerBox">
        <span onClick={handleBtn} className="closeBtn">
          X
        </span>
        <div className="colorBg">
          <span className="innerNum">
            no.{selectedPokemon ? selectedPokemon.num : ""}
          </span>
          <span className="pokename">{selectedPokemon.koname}</span>
          <div className="innerImg">
            <div className="leftImg">
              <img src={selectedPokemon.image} />
            </div>
            <div className="rightImg">
              <img src={selectedPokemon.back_default} />
            </div>
          </div>
        </div>
        <div className="whiteBg"></div>
      </div>
    </div>
  ) : (
    <></>
  );

  return (
    <>
      <div className="pokedex">{pokedexBox}</div>
      <div>{innerBox}</div>
    </>
  );
}
