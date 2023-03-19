import React, {useState, useEffect} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // console.log(coords);
      setCoordinates({ lat: coords.latitude, lng: coords.longitude });
      // console.log(coordinates);
    })
  }, []);

  useEffect(() => {
    // console.log("places", places);
    const filtered = places.filter((place) => place.rating > rating)
    // console.log("filtered", filtered); 
    setFilteredPlaces(filtered);
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      // console.log(coordinates);
      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => {
          console.log(data);
          setWeatherData(data);
      });

      console.log(coordinates, bounds);
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          // console.log(data);
          setIsLoading(false);
          setFilteredPlaces([]);
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        });
    }
  }, [bounds, type]);


  // console.log(places);
  // console.log(filteredPlaces);

  return (
          <>
        <CssBaseline />
      <Header setCoordinates={setCoordinates} />
              <Grid container spacing={3} style={{ width: '100%' }}>
                  <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
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
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                      />
                  </Grid>
              </Grid>
          </>
  )
}

export default App
