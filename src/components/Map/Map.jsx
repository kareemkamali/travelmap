import React, { useContext } from 'react';
import  GoogleMapReact  from 'google-map-react';

import useStyles from './styles';
import { Typography, useMediaQuery,Paper } from '@material-ui/core';
import { placesContext } from '../../context/places-context';
import { LocationOnOutlined } from '@material-ui/icons';
import mapStyles from './mapStyles';


const Map = ({weatherData,setCoordinates,setBounds,coordinates,setChildClicked}) => {
const places=useContext(placesContext).places;
const filterPlaces=useContext(placesContext).filterPlaces;
let p=places;
if(filterPlaces.length){ p=filterPlaces}
  const isDesktop=useMediaQuery('(min-width:600px)');
const classes=useStyles();

// useState(null);


  
  return (
<div className={classes.mapContainer}>
  <GoogleMapReact
  bootstrapURLKeys= {{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
  defaultCenter={coordinates}
  center={coordinates}
  defaultZoom={14}
  margin={[50,50,50,50]}
  options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
  onChange={(e)=>{setCoordinates({
    lat:e.center.lat,
    lng:e.center.lng
  });
setBounds({
  ne:e.marginBounds.ne,
  sw:e.marginBounds.sw
})
  
}
}
  onChildClick={(child)=>{setChildClicked(child)}}
  >
{p?.map((place,i)=>(
  <div className={classes.markerContainer} 
  lat={Number(place.latitude)}
  lng={Number(place.longitude)}
  key={i}
 >
   {!isDesktop?(
     <LocationOnOutlined></LocationOnOutlined>
   ):(
<Paper elevation={3} className={classes.paper} >
  <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
    {place.name}
    </Typography>
    <img  className={classes.pointer}
      src={place.photo?place.photo.images.large.url:''}
      alt={place.name}
  />
    </Paper>

   )}


  </div>
))}
{weatherData?.list?.map((data,i)=>(
  <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
<img alt="weather" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
  </div>
))}


  </GoogleMapReact>
</div>
  )
}

export default Map