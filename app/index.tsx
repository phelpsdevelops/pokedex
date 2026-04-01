import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, Pressable } from "react-native";


interface Pokemon{
  name:string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}
interface PokemonType{
  type: {
    name: string;
    url: string;
  }
}

const colorsByType={
  grass:"green",
  fire:"orange",
  water:"blue",
  bug:"green"
}
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    
    console.log(JSON.stringify(pokemons[0], null, 2))
    useEffect(()=>{
      
    //fetch pokemons
    fetchPokemons();

  },[])

  async function fetchPokemons(){
    try{
      const response= await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      const data= await response.json();

      //Fetch detail info for each Pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) =>{
          const res = await fetch(pokemon.url);
          const details= await res.json();
          return{
            name: pokemon.name,
            image: details.sprites.front_default, //main sprite
            imageBack: details.sprites.back_default,
            types: details.types,
          }
        })
      )
      

      setPokemons(detailedPokemons);
      

    } catch(e){
      console.log(e);
    }
  }

  return (
    <ScrollView
    contentContainerStyle={{gap:16, padding:16}}>
      {pokemons.map((pokemon)=>(
     <Link 
     key={pokemon.name} 
     href={ {pathname:"/details", params:{name: pokemon.name}}}>
        <View style={{
          //@ts-ignore
          backgroundColor:colorsByType[pokemon.types[0].type.name],
          padding:20,
          borderRadius:20,
          }}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={{
              flexDirection: "row"
            }}>

              <Image source = {{uri: pokemon.image}}
              style = {{ width:150, height:150}}
              ></Image>

              <Image source = {{uri: pokemon.imageBack}}
              style = {{ width:150, height:150}}
              ></Image>
              </View>

        </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name:{
    fontSize: 28,
    fontWeight:'bold',
    textAlign: 'center',
  },
  type:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center'

  }
})