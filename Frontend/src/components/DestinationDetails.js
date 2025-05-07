import React from "react";
import { useParams } from "react-router-dom"; // ✅ Correctly import useParams
import "./DestinationDetails.css";

const destinations = [
  {
    name: "Mumbai",
    category: "City",
    description: "Gateway of India, Marine Drive",
    image: "/images/mumbai.jpg",
    details: [
      { spot: "Gateway of India", image: "/images/gateway.jpg", rating: 4 },
      { spot: "Marine Drive", image: "/images/marine_drive.jpg", rating: 5 },
      { spot: "Elephanta Caves", image: "/images/elephanta_caves.jpg", rating: 3 },
      { spot: "Juhu Beach", image: "/images/juhu_beach.jpg", rating: 4 },
    ],
  },
  {
    name: "Lonavala",
    category: "Nature",
    description: "Karla Caves, Bhushi Dam",
    image: "/images/lonavala.jpg",
    details: [
      { spot: "Karla Caves", image: "/images/karla_caves.jpg", rating: 5 },
      { spot: "Bhushi Dam", image: "/images/bhushi_dam.jpg", rating: 4 },
      { spot: "Tiger’s Leap", image: "/images/tigers_leap.jpg", rating: 4 },
      { spot: "Lonavala Lake", image: "/images/lonavala_lake.jpg", rating: 5 },
    ],
  },
  {
    name: "Mahabaleshwar",
    category: "Hills",
    description: "Strawberry farms, Arthur Seat Point",
    image: "/images/mahabaleshwar.jpg",
    details: [
      { spot: "Venna Lake", image: "/images/venna_lake.jpg", rating: 4 },
      { spot: "Arthur Seat", image: "/images/arthur_seat.jpg", rating: 5 },
      { spot: "Mapro Garden", image: "/images/mapro_garden.jpg", rating: 4 },
      { spot: "Wilson Point", image: "/images/wilson_point.jpg", rating: 5 },
    ],
  },
  {
    name: "Pune",
    category: "City",
    description: "Shaniwar Wada, Aga Khan Palace",
    image: "/images/pune.jpg",
    details: [
      { spot: "Shaniwar Wada", image: "/images/shaniwar_wada.jpg", rating: 4 },
      { spot: "Aga Khan Palace", image: "/images/aga_khan_palace.jpg", rating: 5 },
      { spot: "Sinhagad Fort", image: "/images/sinhagad_fort.jpg", rating: 5 },
      { spot: "Pataleshwar Cave Temple", image: "/images/pataleshwar.jpg", rating: 4 },
    ],
  },
  {
    name: "Nashik",
    category: "Nature",
    description: "Trimbakeshwar Temple, Sula Vineyards",
    image: "/images/nashik.jpg",
    details: [
      { spot: "Trimbakeshwar Temple", image: "/images/trimbakeshwar.jpg", rating: 5 },
      { spot: "Sula Vineyards", image: "/images/sula_vineyards.jpg", rating: 4 },
      { spot: "Panchvati", image: "/images/panchvati.jpg", rating: 4 },
      { spot: "Anjneri Hills", image: "/images/anjneri_hills.jpg", rating: 5 },
    ],
  },
  {
    name: "Alibaug",
    category: "Beach",
    description: "Alibaug Beach, Kolaba Fort",
    image: "/images/alibag.jpg",
    details: [
      { spot: "Alibaug Beach", image: "/images/alibaug_beach.jpg", rating: 5 },
      { spot: "Kolaba Fort", image: "/images/kolaba_fort.jpg", rating: 4 },
      { spot: "Nagaon Beach", image: "/images/nagaon_beach.jpg", rating: 5 },
      { spot: "Kanakeshwar Forest", image: "/images/kanakeshwar_forest.jpg", rating: 4 },
    ],
  },
  {
    name: "Ratnagiri",
    category: "Beach",
    description: "Ganpatipule Beach, Ratnadurg Fort",
    image: "/images/ratnagiri.jpg",
    details: [
      { spot: "Ganpatipule Beach", image: "/images/ganpatipule_beach.jpg", rating: 5 },
      { spot: "Ratnadurg Fort", image: "/images/ratnadurg_fort.jpg", rating: 4 },
      { spot: "Thibaw Palace", image: "/images/thibaw_palace.jpg", rating: 5 },
      { spot: "Jaigad Fort", image: "/images/jaigad_fort.jpg", rating: 4 },
    ],
  },
  {
    name: "Aurangabad",
    category: "Historical",
    description: "Ajanta and Ellora Caves, Bibi Ka Maqbara",
    image: "/images/aurangabad.jpg",
    details: [
      { spot: "Ajanta Caves", image: "/images/ajanta_caves.jpg", rating: 5 },
      { spot: "Ellora Caves", image: "/images/ellora_caves.jpg", rating: 4 },
      { spot: "Bibi Ka Maqbara", image: "/images/bibi_maqbara.jpg", rating: 4 },
      { spot: "Daulatabad Fort", image: "/images/daulatabad_fort.jpg", rating: 4 },
    ],
  },
];

const DestinationDetails = () => {
  const { name } = useParams(); // ✅ Get the destination name from the URL

  const destination = destinations.find((d) => d.name === name);

  if (!destination) {
    return <p>Destination not found</p>;
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  return (
    <div className="destination-details">
      <h2>{destination.name} Tourist Spots</h2>
      
      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={destination.image}
          alt={destination.name}
          className="main-image"
        />
      </div>

      {/* Details Section */}
      <div className="details-container">
        {destination.details.map((detail, index) => (
          <div className="photo-card" key={index}>
            <img src={detail.image} alt={detail.spot} className="detail-image" />
            <div className="photo-card-content">
              <h4>{detail.spot}</h4>
              <p>{renderStars(detail.rating)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationDetails;
