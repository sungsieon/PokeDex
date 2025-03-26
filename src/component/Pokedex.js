import { useEffect, useState } from "react";
import "../css/Pokedex.css";
import axios from "axios";
import React from "react";

export default function Pokedex({ changeLanguage, changeBright, inputValue }) {
  const [data, setData] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [cachedPokemonList, setCachedPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [inner, setInner] = useState(true);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loadingCount, setLoadingCount] = useState(true)
  

  //pokemon API

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;

      setLoading(true);
      

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=150`
        );
        const pokeData = response.data;
        const pokemonUrls = response.data.results;

        const pokemonDetailsArray = await Promise.all(
          pokemonUrls.map((pokemon) => axios.get(pokemon.url))
        );

        const speciesDetailsArray = await Promise.all(
          pokemonDetailsArray.map((pokemon) =>
            axios.get(pokemon.data.species.url)
          )
        );

        const pokemonData = pokemonDetailsArray.map((pokemon, index) => {
          const { name, sprites, types, abilities, height, weight } =
            pokemon.data;
          const speciesDetails = speciesDetailsArray[index]?.data;

          if (!speciesDetails) {
            console.error(`No species details available for ${name}`);
            return {};
          }

          const koreanName =
            speciesDetails.names.find(
              (nameObj) => nameObj.language.name === "ko"
            )?.name || name;

          const descriptionObj =
            speciesDetails.flavor_text_entries.find(
              (entry) => entry.language.name === "ko"
            ) ||
            speciesDetails.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            );

          const description = descriptionObj
            ? descriptionObj.flavor_text
            : "설명이 없습니다.";

          return {
            name,
            koname: koreanName,
            image: sprites.front_default,
            types: types.map((type) => type.type.name),
            abilities: abilities.map((ability) => ability.ability.name),
            back_default: sprites.back_default,
            height: (height / 10).toFixed(1),
            weight: (weight / 10).toFixed(1),
            description,
          };
        });

        setPokemonList((prevList) => {
          const uniquePokemon = pokemonData
            .slice(0, limit)
            .filter((p) => !prevList.some((prevP) => prevP.name === p.name));
          return [...prevList, ...uniquePokemon];
        });

        if (cachedPokemonList.length === 0) {
          setCachedPokemonList(pokemonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }

      setLoadingCount(false);
    };

    fetchData();
  }, [offset]);

  //-------------------------------------------------------------------------------

  // 2. 스크롤 이벤트 처리

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        document.documentElement.scrollHeight ===
        document.documentElement.scrollTop + window.innerHeight;

      if (bottom && !loading) {
        setOffset((prevOffset) => prevOffset + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  // pokeBox
  const filterPokemon = cachedPokemonList.filter((pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      pokemon.koname.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const filteredList = inputValue ? filterPokemon.slice(0, limit) : pokemonList;

  const pokedexBox = filteredList.map((pokemon, index) => {
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
        <div
          className={`
    ${selectedPokemon.types.includes("grass") ? "glassBg" : ""}
    ${selectedPokemon.types.includes("fire") ? "fireBg" : ""}
    ${selectedPokemon.types.includes("water") ? "waterBg" : ""}
    ${selectedPokemon.types.includes("poison") ? "poisonBg" : ""}
    ${selectedPokemon.types.includes("psychic") ? "psychicBg" : ""}
    ${selectedPokemon.types.includes("electric") ? "electricBg" : ""}
    ${selectedPokemon.types.includes("dragon") ? "dragonBg" : ""}
    ${selectedPokemon.types.includes("normal") ? "normalBg" : ""}
    ${selectedPokemon.types.includes("bug") ? "bugBg" : ""}
    ${selectedPokemon.types.includes("ice") ? "iceBg" : ""}
    ${selectedPokemon.types.includes("ground") ? "groundBg" : ""}
    ${selectedPokemon.types.includes("fairy") ? "fairyBg" : ""}
    ${selectedPokemon.types.includes("fighting") ? "fightingBg" : ""}
     ${selectedPokemon.types.includes("rock") ? "rockBg" : ""}
    // 여기에 다른 속성에 맞는 조건 추가
  `}
        >
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
      {loading && loadingCount && <div className="spinner"></div>}
      <div className="pokedex">{pokedexBox}</div>
      <div>{innerBox}</div>
    </>
  );
}
