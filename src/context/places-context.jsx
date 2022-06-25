import { createContext } from "react";


export const placesContext=createContext(
    
    {
    places:[],
    // ChildClicked:null,
    isLoading:false,
    filterPlaces:[]
}

);