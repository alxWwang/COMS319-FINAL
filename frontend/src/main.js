import React, { useState, useEffect} from "react";
import "./style.css";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";
import "@fortawesome/fontawesome-free/css/all.min.css"; //BUTTON ICON
// import { currentViewContext } from "./website";

//onclick function
// const { currentView, setCurrentView } = useContext(currentViewContext);
  

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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("allPlace: ", allPlaceArray);
  }, [allPlaceArray]);

  useEffect(() => {
    console.log("routesArray: ", routesArray);
  }, [routesArray]);

  let loadRoutes = async () => {
    try {
      const response = await fetch("http://localhost:3000/getRoute");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Check if the data is as expected (e.g., an array of routes)
      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format");
      }

      console.log("Data received:", data);

      setRoutesArray(data);
    } catch (error) {
      console.error("Error loading routes:", error);
      alert("Failed to load routes. Please try again later.");
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  let create = (data) => {
    fetch("http://localhost:3000/addRoute", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Success:", data);
        alert(
          "Items added successfully!, pls click the View All button to see your added items"
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add items");
      });
  };

  let deletor = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`http://localhost:3000/delete/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        console.log("Success:", data);
      }
    } catch (error) {
      console.error("delete failed:", error);
    }
  };

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

  // let searchPlaces = () => {
  //   const req = {
  //     textQuery: "Tugu Muda",
  //     fields: ["displayName", "location", "businessStatus", "photos"],
  //   };

  //   let place = loader.importLibrary("places").then((el) => {
  //     el.Place.searchByText(req).then((res) => {
  //       let place = res["places"][0]["Fg"];
  //       console.log(place);
  //       place["photos"] = place["photos"][0];
  //       let latM = place["location"]["lat"];
  //       let lngM = place["location"]["lng"];
  //       moveMap(latM, lngM, 15);
  //       addMarker([place]);
  //       nearbyPlaces(place);
  //       // sendEmail(place, "nicholaspribadi.1209@gmail.com");
  //     });
  //   });
  // };

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

  let addRoute = async (place) => {
    let tmp = [...routesArray];
    for (let i of tmp) {
      if (place.id === i.id) {
        alert(`You're trying to add the same location!`);
        return false;
      }
    }
    setRoutesArray([...routesArray, place]);
    await create(place);
  };

  let removeRoute = async (place) => {
    const updatedRoutesArray = routesArray.filter(
      (item) => item.id !== place.id
    );
    setRoutesArray(updatedRoutesArray);
    await deletor(place);
  };

  /////

  const [searchValue, setSearchValue] = useState("Iowa State University");

  // Handler for input change
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Handler for executing the search
  const searchPlaces = () => {
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
        // sendEmail(place, "nicholaspribadi.1209@gmail.com");
      });
    });
  };

  // Handler to execute search on pressing Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the form from being submitted
      searchPlaces();
    }
  };
////////
  function getScrollAmount() {
    // Adjust scroll amount based on viewport width
    return window.innerWidth <= 768 ? 100 : 200;
  }

  function scrollLeft() {
    const container = document.querySelector(".flex-container");
    container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  }

  function scrollRight() {
    const container = document.querySelector(".flex-container");
    container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  }
  ///////////
  // const handleEmail = (e) => {
  //   e.preventDefault(); // Prevents form submission or other default actions
  //   setCurrentView(3);
  // };

  return (
    <div>
      <div className="main_container">
        <div className="subcontainer-1">
          <APIProvider apiKey={YOUR_API_KEY}>
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
        </div>

        <div className="subcontainer-2">
          <form id="searchBox" className="searchplace_bar">
            <div id="lol"></div>
            <input
              name="searchMain"
              type="text"
              placeholder="Search for Places"
              value={searchValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              id="searchButton"
              type="button"
              style={{ fontSize: "17px", color: "black" }}
              className="search"
              onClick={searchPlaces}
            >
              <i className="fa fa-search"></i>
            </button>
            {/* The refresh button code is commented out, just like in your original HTML */}
          </form>
          <div className="recommended_places">
            {allPlaceArray.map((el) => (
              <div
                id="place1"
                className="box"
                style={{
                  backgroundImage: `url("https://places.googleapis.com/v1/${el["photos"]["name"]}/media?maxHeightPx=200&maxWidthPx=200&key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44")`,
                  backgroundRepeat: "no-repeat",
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
                    <i className="fa fa-plus"> </i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="submain_container">
        <div className="day_count">Itinerary</div>
        <div className="placeAdd" style={{ scrollbarWidth: "none" }}>
          {routesArray.map((el) => (
            <div className="item">
              <div
                className="place-item"
                style={{
                  backgroundImage: `url("https://places.googleapis.com/v1/${el["photos"]["name"]}/media?maxHeightPx=200&maxWidthPx=200&key=AIzaSyCjYXZxKuPYLUKNH-v_RhheHwhBP8UyV44")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="place-content">
                  <p>{el["displayName"]}</p>
                  <button
                    onClick={() => {
                      removeRoute(el);
                    }}
                  >
                    <i>-</i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button id="cta_button"  >Save</button>
      </div>
      
      
    </div>
  );
}

export default App;
