import React from 'react';

/**
 * Home component renders a splash page with a hero image and descriptive text.
 * The hero image is fetched from Unsplash via their public source endpoint.
 */
const Home = () => {
  return (
    <div className="home-container">
  <div className="hero">
    <img
      src="https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1600&q=80"
      alt="Weight scale"
      className="hero-image"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "https://images.unsplash.com/photo-1557935728-8e9f5a3b9d7f?auto=format&fit=crop&w=1600&q=80";
      }}
    />
    <div className="hero-overlay">
      <div>
        <h1>Track Your Journey</h1>
        <p>
          Welcome to Weight Tracker, your personal companion for logging and
          visualizing your weight over time. Empower yourself by monitoring
          progress and staying motivated with easy-to-use charts. Make your
          wellness journey engaging and data-driven!
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;