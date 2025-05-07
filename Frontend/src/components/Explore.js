import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Explore.css";

const destinations = [
  {
    name: "Mumbai",
    category: "City",
    description: "Gateway of India, Marine Drive",
    image: "/images/mumbai.jpg",
    details: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach"],
  },
  {
    name: "Lonavala",
    category: "Nature",
    description: "Karla Caves, Bhushi Dam",
    image: "/images/lonavala.jpg",
    details: ["Karla Caves", "Bhushi Dam", "Tiger’s Leap", "Lonavala Lake"],
  },
  {
    name: "Mahabaleshwar",
    category: "Hills",
    description: "Strawberry farms, Arthur Seat Point",
    image: "/images/mahabaleshwar.jpg",
    details: ["Venna Lake", "Arthur Seat", "Mapro Garden", "Wilson Point"],
  },
  {
    name: "Pune",
    category: "City",
    description: "Shaniwar Wada, Aga Khan Palace",
    image: "/images/pune.jpg",
    details: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort", "Pataleshwar Cave Temple"],
  },
  {
    name: "Nashik",
    category: "Nature",
    description: "Trimbakeshwar Temple, Sula Vineyards",
    image: "/images/nashik.jpg",
    details: ["Trimbakeshwar Temple", "Sula Vineyards", "Panchvati", "Anjneri Hills"],
  },
  {
    name: "Alibaug",
    category: "Beach",
    description: "Alibaug Beach, Kolaba Fort",
    image: "/images/alibag.jpg",
    details: ["Alibaug Beach", "Kolaba Fort", "Nagaon Beach", "Kanakeshwar Forest"],
  },
  {
    name: "Ratnagiri",
    category: "Beach",
    description: "Ganpatipule Beach, Ratnadurg Fort",
    image: "/images/ratnagiri.jpg",
    details: ["Ganpatipule Beach", "Ratnadurg Fort", "Thibaw Palace", "Jaigad Fort"],
  },
  {
    name: "Aurangabad",
    category: "Historical",
    description: "Ajanta and Ellora Caves, Bibi Ka Maqbara",
    image: "/images/aurangabad.jpg",
    details: ["Ajanta Caves", "Ellora Caves", "Bibi Ka Maqbara", "Daulatabad Fort"],
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const handleCheckboxChange = (category) => {
    setFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredDestinations = destinations.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter.length === 0 || filter.includes(d.category);
    return matchSearch && matchFilter;
  });

  const handleViewMore = (name) => {
    navigate(`/destination/${name}`); // ✅ Navigate to the details page
  };

  return (
    <div className="explore-page">
      <h1>Explore Maharashtra</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          {["Nature", "City", "Hills", "Beach", "Historical"].map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={filter.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="cards-container">
        {filteredDestinations.map((d, i) => (
          <div className="destination-card" key={i}>
            <img src={d.image} alt={d.name} />
            <h3>{d.name}</h3>
            <p>{d.description}</p>
            <button onClick={() => handleViewMore(d.name)}>View More</button> {/* ✅ Correct the button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
