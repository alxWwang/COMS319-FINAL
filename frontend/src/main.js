import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";

const YOUR_API_KEY = "AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44"; // Replace with your actual API key

function App() {
  const loader = new Loader({
    apiKey: "AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44",
  });

  const [position, setPosition] = useState({ lat: 1, lng: 1 });
  const [zoom, setZoom] = useState(1);
  const [markers, setMarkers] = useState([]);
  const [allPlaceArray, setPlaceArray] = useState([]);
  const [routesArray, setRoutesArray] = useState([]);
  useEffect(() => {
    console.log("allPlace: ", allPlaceArray);
  }, [allPlaceArray]);

  useEffect(() => {
    console.log("routesArray: ", routesArray);
  }, [routesArray]);

  const sendEmail = async (places, addy) => {
    const data = { places, email: addy }; // Your JSON object
    try {
      const response = await fetch("http://localhost:3000/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  let moveMap = (lat, lng, zoom) => {
    setPosition({ lat: lat, lng: lng });
    setZoom(zoom);
  };

  let searchPlaces = () => {
    const req = {
      textQuery: "Tugu Muda",
      fields: ["displayName", "location", "businessStatus", "photos"],
    };

    let place = loader.importLibrary("places").then((el) => {
      el.Place.searchByText(req).then((res) => {
        let place = res["places"][0]["Fg"];
        console.log(place);
        place["photos"] = place["photos"][0];
        let latM = place["location"]["lat"];
        let lngM = place["location"]["lng"];
        moveMap(latM, lngM, 15);
        addMarker([place]);
        nearbyPlaces(place);
        sendEmail(place, "nicholaspribadi.1209@gmail.com");
      });
    });
  };

  let nearbyPlaces = (places) => {
    let latM = places["location"]["lat"];
    let lngM = places["location"]["lng"];

    let center = loader.importLibrary("core").then((el) => {
      const request = {
        locationRestriction: {
          center: new el.LatLng(latM, lngM),
          radius: 500,
        },
        fields: ["displayName", "location", "businessStatus", "photos"],
      };
      console.log(request);

      let place = loader.importLibrary("places").then((el) => {
        el.Place.searchNearby(request).then((res) => {
          console.log(res.places);

          let placeArray = [];
          for (let i of res.places) {
            let tmp = i["Fg"];
            tmp["photos"] = tmp["photos"][0];
            placeArray.push(tmp);
          }
          setPlaceArray(placeArray);
          addMarker(placeArray);
        });
      });
    });
  };

  let addMarker = (places) => {
    let newMarkers = [];
    for (let i of places) {
      const latM = i["location"]["lat"];
      const lngM = i["location"]["lng"];
      newMarkers.push({ key: i["id"], position: { lat: latM, lng: lngM } });
    }
    let tmpMarker = markers;
    tmpMarker = [...markers, ...newMarkers];
    setMarkers((prev) => [...prev, ...newMarkers]);
  };

  let addRoute = (place) => {
    console.log(place);
    let routesSelected = routesArray;
    routesSelected.push(place);
    setRoutesArray([...routesSelected]);
  };

  let removeRoute = (place) =>{
    let tmpArr = []
    let routesSelected =  routesArray;
    for( let i of routesSelected){
      if (i !== place){
        tmpArr.push(i);
      }
    }
    setRoutesArray(tmpArr)
  }


  return (
    <div>
      <APIProvider apiKey={YOUR_API_KEY} className="main_container">
        <Map
          center={position}
          zoom={zoom}
          id={"maps"}
          onZoomChanged={(z) => {
            setPosition(z.detail.center);
            setZoom(z.detail.zoom);
          }}
          onCenterChanged={(z) => {
            setPosition(z.detail.center);
            setZoom(z.detail.zoom);
          }}
          className="subcontainer-1"
        >
          {markers.map((el) => (
            <Marker key={el.key} position={el.position}></Marker>
          ))}
        </Map>
      </APIProvider>

      <button onClick={searchPlaces}>Search</button>

      <div className="recommended_places">
        {allPlaceArray.map((el) => (
          <div
            id="place1"
            className="box"
            style={{
              backgroundImage: `url("https://places.googleapis.com/v1/${el["photos"]["name"]}/media?maxHeightPx=200&maxWidthPx=200&key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44")`,
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="place_name">
              <p id="name-place1">{el["displayName"]}</p>
              <button
                onClick={() => {
                  addRoute(el);
                }}
                style={{ fontSize: "20px" }}
              >
                <i className="fa fa-plus"> +</i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="submain_container">
        <div className="day_count">Itinerary</div>
        <div className="placeAdd" style={{scrollbarWidth: "none"}}>
          {routesArray.map((el)=>(

            <div className="item">
            <div className="place-item" style={{
              backgroundImage: `url("https://places.googleapis.com/v1/${el["photos"]["name"]}/media?maxHeightPx=200&maxWidthPx=200&key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}>
        
              <div className="place-content">
                <p>{el['displayName']}</p>
                <button onClick={()=>{removeRoute(el)}}>
                  <i>-</i>
                </button>
              </div>
            </div>
            </div>

          ))}
          

          
        </div>
      </div>
    </div>
  );
}

export default App;
