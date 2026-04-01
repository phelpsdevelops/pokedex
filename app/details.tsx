
import { useLocalSearchParams } from "expo-router";
import { useEffect,useState } from "react";

import { ScrollView, StyleSheet,Text } from "react-native";


export default function Details() {
const {name}= useLocalSearchParams<{name: string}>();
const [pokemon,setPokemon]=useState<any>(null);
  console.log(name)
  useEffect(()=>{
    if(name){
    fetchPokemonByName(name);
    }
  },[name]);

  async function fetchPokemonByName(name: string){
   try{
      const response= await fetch(
        "https://pokeapi.co/api/v2/pokemon/"+name
      );
      const data= await response.json();
         setPokemon({
          name: data.name,
          experience:data.base_experience,
          height: data.height,
          weight:data.weight

         })
      

    } catch(e){
      console.log(e);
    }
  }
return (
    <ScrollView
    contentContainerStyle={{
        gap:16,
     padding:16
     }}>
   <Text style={styles.name}>Name: {pokemon?. name}</Text>
   <Text style={styles.name}>Experience: {pokemon?.experience}</Text>
   <Text style={styles.name}>Height: {pokemon?.height}</Text>
   <Text style={styles.name}>Weight: {pokemon?.weight}</Text>


     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
name:{
  color:'black'
}
})