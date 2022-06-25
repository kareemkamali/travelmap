import React,{useEffect, useState} from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import {CssBaseline,Grid} from '@material-ui/core';
import { getPlacesData, getWeatherData } from "./api";


import { placesContext } from "./context/places-context";



const App=()=>{
const [places,setPlaces]=useState([]);
const [chiledClicked,setChildClicked]=useState(null);

const[coordinates,setCoordinates]=useState({lat:10,lng:10});
const[bounds,setBounds]=useState({});

const[isLoading,setIsLoading]=useState(false);

const [type,setType]=useState('restaurants');
  const [rating,setRating]=useState(0);
const [filteredPlaces,setFilteredPlaces]=useState([]);

const[weatherData,setWeatherData]=useState([]);

useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      });
},[])

useEffect(()=>{
const filteredPlaces=places.filter((place)=>place.rating>rating)
setFilteredPlaces(filteredPlaces);
},[rating])
useEffect(()=>{
    if(bounds.sw && bounds.ne)
setIsLoading(true);
getWeatherData(coordinates.lat,coordinates.lng).then((data)=>setWeatherData(data));
    getPlacesData(type,bounds.sw,bounds.ne).then((data)=>{
        setPlaces(data?.filter((place)=>place.name && place.num_reviews>0));
        setFilteredPlaces([])
        setIsLoading(false);
 
    });
},[bounds,type]);


    return (
   <>
   
   <placesContext.Provider
   value={{
       places:places,
    //    ChildClicked:chiledClicked,
       isLoading:isLoading,
       filterPlaces:filteredPlaces
   }}
   >

 
   <CssBaseline>
       <Header/>
       <Grid container spacing={3} style={{width:'100%'}}>
       <Grid item xs={12} md={4}>
           <List 
chiledClicked={chiledClicked}
type={type}
setType={setType}
setRating={setRating}

           />
           </Grid>
       <Grid item xs={12} md={8}>
           <Map 
           setCoordinates={setCoordinates}
           setBounds={setBounds}
           coordinates={coordinates}
           setChildClicked={setChildClicked}
           weatherData={weatherData}
           />
           </Grid>
       </Grid>

   </CssBaseline>
   </placesContext.Provider>
   </>
    );
}
export default App;

