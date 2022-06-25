import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {AppBar,Toolbar,Typography,InputBase,Box} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import useStyles from './styles.js';
const Header = ({setCoordinates}) => {
const classes=useStyles();
const [autoComplete,setAutoComplete]=useState(null);

const onLoad=(autoC)=>setAutoComplete(autoC);
const onPlaceChange=()=>{
  const lat=autoComplete.getPlace().geometry.location.lat();
  const lng=autoComplete.getPlace().geometry.location.lng();
  setCoordinates({lat,lng})
}
  return (
<AppBar display='flex' position='static'>
  <Toolbar className={classes.toolbar}>
    <Typography variant='h5'>
      Travel Advisor
    </Typography>
    <Box display='flex'>
    <Typography variant='h6' className={classes.title}>
Explore new places
    </Typography>
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <Search />
        </div>
        <InputBase placeholder='Search...' classes={{root:classes.inputRoot,input:classes.inputInput }} />
      </div>
    </Autocomplete>
    </Box>
  </Toolbar>
</AppBar>
  )
}

export default Header;