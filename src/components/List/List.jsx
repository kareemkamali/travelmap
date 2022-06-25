import { CircularProgress, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import React, { createRef, useContext, useEffect, useState } from 'react';
import { placesContext } from '../../context/places-context';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({chiledClicked,type,setType,rating,setRating}) => {
  const classes=useStyles();
  // const [type,setType]=useState('restaurants');
  // const [rating,setRating]=useState(0);
  const places=useContext(placesContext).places;
  const filterPlaces=useContext(placesContext).filterPlaces;
  let p=places;
  if(filterPlaces.length){ p=filterPlaces}
  
  // const chiledClicked=useContext(placesContext).ChildClicked;
  const isLoading=useContext(placesContext).isLoading;


const [elRefs,setElRefs]=useState([{
  current:2
}]);

useEffect(()=>{
 
  setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  // setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  // setElRefs(refs);

},[places]);

console.log({elRefs})

//   const k=[
//     {
//     name:'kareem'
//   },
//   {
//     name:'kareem'
//   }
// ,
// {
//   name:'kareem'
// },
// ]

  return (
<div className={classes.container}>
  <Typography variant="h4">
    Restaurants,Hotels & Attractions aroud you
  </Typography>
  {isLoading?<div className={classes.loading}>
    <CircularProgress size='5rem'></CircularProgress>
    </div>
    :(
      <>
 
  <FormControl className={classes.formControl}>
    <Select value={type} onChange={(e)=>setType(e.target.value)}>
      <MenuItem value='restaurants'>Restaurant</MenuItem>
      <MenuItem value='hotels'>Hotels</MenuItem>
      <MenuItem value='attractions'>Attractions</MenuItem>
    </Select>
  </FormControl>
  <FormControl className={classes.formControl}>

    <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
      <MenuItem value={0}>All Rating</MenuItem>
      <MenuItem value={3}>Above 3.0</MenuItem>
      <MenuItem value={4}>Above 4.0</MenuItem>
      <MenuItem value={4.5}>Above 4.5</MenuItem>
    </Select>
  </FormControl>
  <Grid container spacing={3} className={classes.list}>
    {p?.map((place,i)=>(
      <Grid  item key={i} xs={12}>
     <PlaceDetails
      place={place}
      selected={Number(chiledClicked)===i}
      refProp={elRefs[i]}
      ></PlaceDetails>
     
    
      </Grid>
    ))}

  
  </Grid>
  </>
    )
}
</div>
  )

}

export default List