import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

import ErrorBoundary from "../ErrorBoundary.js";

const mapStyles = require("../../mapStyles.js"); // Use require to import the array

const Map = ({
  coords,
  places,
  setCoords,
  setBounds,
  setChildClicked,
  weatherData,
}) => {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

  // Define the Google Maps API key within your component
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const handleApiLoaded = (map, maps) => {
    // 'map' is the instance of the map
    // 'maps' is the Google Maps API object
    // You can interact with the map here
  };
  return (
        <ErrorBoundary>
          <div className={classes.mapContainer}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: googleMapsApiKey,
                libraries: ["places"],
              }}
              defaultCenter={coords}
              center={coords}
              defaultZoom={14}
              margin={[50, 50, 50, 50]}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: mapStyles,
              }}
              onChange={(e) => {
                setCoords({ lat: e.center.lat, lng: e.center.lng });
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
              }}
              onChildClick={(child) => setChildClicked(child)}
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // Add this line
              yesIWantToUseGoogleMapApiInternals // Add this line
            >
              {places.length &&
                places.map((place, i) => (
                  <div
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                  >
                    {!matches ? (
                      <LocationOnOutlinedIcon
                        color="primary"
                        fontSize="large"
                      />
                    ) : (
                      <Paper elevation={3} className={classes.paper}>
                        <Typography
                          className={classes.typography}
                          variant="subtitle2"
                          gutterBottom
                        >
                          {" "}
                          {place.name}
                        </Typography>
                        <img
                          className={classes.pointer}
                          src={
                            place.photo
                              ? place.photo.images.large.url
                              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                          }
                          alt={place.name} // Add a meaningful alt text based on the content of the image
                        />
                        <Rating
                          name="read-only"
                          size="small"
                          value={Number(place.rating)}
                          readOnly
                        />
                      </Paper>
                    )}
                  </div>
                ))}
              {weatherData?.list?.length &&
                weatherData.list.map((data, i) => (
                  <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                    <img
                      src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                      height="70px"
                      alt={data.weather[0].description} // Describe the weather condition
                    />
                  </div>
                ))}
            </GoogleMapReact>
          </div>
        </ErrorBoundary>
  );
  };
export default Map;
