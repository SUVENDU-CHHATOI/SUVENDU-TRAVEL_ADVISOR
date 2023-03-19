import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    try {
        // console.log(sw, ne);
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        // console.log("IN PLACES DATA",data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
//     try {
//         if (lat && lng) {
//             const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
//                 params: { lon: lng, lat: lat },
//                 headers: {
//                     'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
//                     'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
//                 },
//             });
//             console.log('IN WEATHER DATA', data);
//             return data;
//         }
//   } catch (error) {
//        console.log(error);
//   }


    try {
        if (lat && lng) {
            console.log(lat, lng);
            const { data } = await axios.get(`https://open-weather13.p.rapidapi.com/city/latlon/30.438/-89.1028`, {
                headers: {
                    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
                    'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
                },
            });
            console.log('IN WEATHER DATA', data);
            return data;
        }
  } catch (error) {
       console.log(error);
  }
};