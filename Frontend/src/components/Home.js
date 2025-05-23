import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/explore");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="home-wrapper">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        <div>
          <img src="/images/slide1.jpeg" alt="slide1" />
        </div>
        <div>
          <img src="/images/slide2.jpeg" alt="slide2" />
        </div>
        <div>
          <img src="/images/slide3.jpg" alt="slide3" />
        </div>
      </Carousel>

      <div className="home-overlay-content">
        <h1>Roamify</h1>
        <p>Travel wide, let Roamify be your guide.</p>

        <button className="explore-button" onClick={handleExploreClick}>
          Explore Now
        </button>
      </div>

      {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
    </div>
  );
};

export default Home;
