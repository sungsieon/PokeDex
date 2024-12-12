import {useEffect, useState} from 'react'
import '../css/Pokedex.css';
import axios from 'axios';


export default function Pokedex(){
    const [data,setData] = useState([])
    const [pokemonList,setPokemonList] = useState([])
  
    useEffect(() => {
       const fetchData = async() => {
           try{
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
            const pokeData = response.data
            const pokemonUrls = response.data.results;
            const pokemonData = [];
            setData(pokeData)

            for (let i = 0; i < pokemonUrls.length; i++) {
                const pokemonDetails = await axios.get(pokemonUrls[i].url);
                const {name , sprites, types, abilities} = pokemonDetails.data
            
            pokemonData.push({
                name,
                image: sprites.front_default, // 포켓몬 이미지
                types: types.map((type) => type.type.name), // 포켓몬 타입
                abilities: abilities.map((ability) => ability.ability.name) // 포켓몬 능력
              });
            }

            setPokemonList(pokemonData);
            }
       
           catch(error){
            console.error("Error fetching data:",error);
           }

           
       }

       fetchData();
    },[])

    if(pokemonList.length > 0){
        console.log(pokemonList[0])
    }
    

   
   const num = 1;

   const pokedexBox = pokemonList.map((pokemon, index) => {


     const num = index + 1;

      return(
       <>
       <div className="pokedexBox">
       <span>no.{num}</span><br></br>
       <span>{pokemonList.name}</span>
       </div>
       
       </>
      )
   })

   
     
    return(
        <>
        <main className="main">
        <div className="mainLogo">
        <img src="data:image/png;base64,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"></img>
        </div>
        <div className="searchBox">
        <input 
        placeholder='키워드를 입력해 주세요.'
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <div className="pokedex">
         {pokedexBox}
         </div>
        </main>
        </>
    )

  }
    

