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
          const { name, sprites, types, abilities, height, weight } = pokemonDetails.data;

          const speciesDetails = await axios.get(
            pokemonDetails.data.species.url
          );
          const koreanName =
            speciesDetails.data.names.find(
              (nameObj) => nameObj.language.name === "ko"
            )?.name || name;

            const descriptionObj = speciesDetails.data.flavor_text_entries.find(
              (entry) => entry.language.name === "ko" // 한국어 설명 찾기
            ) || speciesDetails.data.flavor_text_entries.find(
              (entry) => entry.language.name === "en" // 한국어 설명이 없으면 영어 설명 사용
            );
    
            const description = descriptionObj ? descriptionObj.flavor_text : "설명이 없습니다.";

          pokemonData.push({
            name,
            koname: koreanName,
            image: sprites.front_default,
            types: types.map((type) => type.type.name),
            abilities: abilities.map((ability) => ability.ability.name),
            back_default: sprites.back_default,
            height: (height/10).toFixed(1),
            weight: (weight/10).toFixed(1),
            description,
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
        <div className="whiteBg">
          <div className="pokemonInformation">
            <div className="typeInformation">
              <span className="infoType">타입</span>
              <div className="typeBox">
              {selectedPokemon.types.map((type, key) => (
              <span key={key} className="type2">
                {type}
              </span>
            ))}
             </div>
            </div>                            
            <div className="heightInformation">
              <span className="height">키</span>
              <span>{selectedPokemon.height}m</span>
            </div>
            <div className="weightInformation">
              <span className="weight">몸무게</span>
              <span>{selectedPokemon.weight}kg</span>
            </div>
          </div>
          <div>
            <span className="description">{selectedPokemon.description}</span>
          </div>
        </div>
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
