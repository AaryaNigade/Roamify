import React, { useState } from "react";
import axios from "axios";
import "./Explore.css";

const Explore = () => {
  const [location, setLocation] = useState("");
  const [groupType, setGroupType] = useState("solo");
  const [budget, setBudget] = useState("low");
  const [days, setDays] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const OPENTRIPMAP_API_KEY = "5ae2e3f221c38a28845f05b60aa3621d12aaf4d14018631e56a0b2cf"; // Replace with your actual API key

  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        `https://api.makcorps.com/free?city=${location}`
      );
      setHotels(response.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const fetchAttractions = async () => {
    try {
      // Step 1: Get coordinates of the city
      const geoRes = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/geoname`,
        {
          params: {
            name: location,
            apikey: OPENTRIPMAP_API_KEY,
          },
        }
      );

      const { lat, lon } = geoRes.data;

      // Step 2: Get list of attractions around the city
      const attrRes = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/radius`,
        {
          params: {
            radius: 10000, // 10 km
            lon: lon,
            lat: lat,
            kinds: "interesting_places",
            limit: 10,
            apikey: OPENTRIPMAP_API_KEY,
          },
        }
      );

      const attractionsList = attrRes.data.features;

      // Step 3: Fetch details for each attraction
      const detailedAttractions = await Promise.all(
        attractionsList.map(async (item) => {
          const xid = item.properties.xid;
          const detailRes = await axios.get(
            `https://api.opentripmap.com/0.1/en/places/xid/${xid}`,
            {
              params: {
                apikey: OPENTRIPMAP_API_KEY,
              },
            }
          );
          return detailRes.data;
        })
      );

      setAttractions(detailedAttractions);
    } catch (err) {
      console.error("Error fetching attractions:", err);
    }
  };

  const handleExplore = async () => {
    setLoading(true);
    setError("");
    setHotels([]);
    setAttractions([]);

    try {
      await Promise.all([fetchHotels(), fetchAttractions()]);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-container">
      <h1>Explore Travel Options</h1>
      <div className="explore-form">
        <input
          type="text"
          placeholder="Enter destination"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={groupType} onChange={(e) => setGroupType(e.target.value)}>
          <option value="solo">Solo</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="couple">Couple</option>
        </select>
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="low">Low Budget</option>
          <option value="medium">Medium Budget</option>
          <option value="high">High Budget</option>
        </select>
        <input
          type="number"
          min="1"
          placeholder="Trip Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button onClick={handleExplore}>Explore Now</button>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* HOTEL SECTION */}
      <div className="hotel-section">
        <h2>Hotel Recommendations</h2>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <h3>{hotel[0].hotelName}</h3>
              <ul>
                {hotel[1].map((vendor, idx) => (
                  <li key={idx}>
                    {vendor[`vendor${idx + 1}`]}: $
                    {vendor[`price${idx + 1}`]} + Tax $
                    {vendor[`tax${idx + 1}`]}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          !loading && <p>No hotels found yet.</p>
        )}
      </div>

      {/* ATTRACTIONS SECTION */}
      <div className="attractions-section">
        <h2>Top Attractions</h2>
        {attractions.length > 0 ? (
          attractions.map((place, index) => (
            <div key={index} className="attraction-card">
              <h3>{place.name}</h3>
              {place.preview && (
                <img
                  src={place.preview.source}
                  alt={place.name}
                  width="300"
                  height="200"
                />
              )}
              <p>{place.wikipedia_extracts?.text || "No description available."}</p>
              <p>
                <strong>Category:</strong> {place.kinds}
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No attractions found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
