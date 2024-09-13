import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/HomePage.css';  // Link to your CSS file
import companyLogo from '../resources/logo1.png'; 
import bannerImg1 from '../resources/banner1.jpg'; 
import bannerImg2 from '../resources/banner2.jpg';
import bannerImg3 from '../resources/banner3.jpg';
import cartIcon from '../resources/cart.png'; 
import userIcon from '../resources/user.png';

function HomePage() {
  const [giftCards, setGiftCards] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const banners = [bannerImg1, bannerImg2, bannerImg3];
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('authToken'); // Check local storage or cookies for token
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence

    const fetchGiftCards = async () => {
      const sampleCards = Array.from({ length: 15 }, (_, index) => ({
        id: index + 1,
        platform: `Platform ${index + 1}`,
        price: (Math.random() * 100).toFixed(2),
      }));
      setGiftCards(sampleCards);
    };
    fetchGiftCards();

    // Auto-scroll banners every 5 seconds
    const bannerInterval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
        setIsSliding(false);
      }, 500); // Duration of the slide animation
    }, 5000);

    return () => clearInterval(bannerInterval); // Clean up interval on component unmount
  }, [banners.length]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token from local storage
    setIsLoggedIn(false); // Update local state
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={companyLogo} alt="Company Logo" />
          <div className="logo-name">Gift-Card</div>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search gift cards..." />
        </div>
        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <div className="user-section" 
                onMouseEnter={() => setShowDropdown(true)} 
                onMouseLeave={() => setShowDropdown(false)}
              >
                <img src={userIcon} alt="User" className="user-icon" />
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/settings">Settings</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
              <Link to="/cart" className="cart-btn">
                <img src={cartIcon} alt="Cart" className="cart-icon" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn">Login / Sign Up</Link>
              <Link to="/cart" className="cart-btn">
                <img src={cartIcon} alt="Cart" className="cart-icon" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Categories, Offers, Contact Us, About Us */}
      <div className="info-section">
        <a href="/categories">Categories</a>
        <a href="/offers">Offers</a>
        <a href="/contact">Contact Us</a>
        <a href="/about">About Us</a>
      </div>

      {/* Scrollable Image Banner */}
      <div className={`scroll-banner ${isSliding ? "sliding" : ""}`}>
        <img src={banners[currentBanner]} alt={`Banner ${currentBanner + 1}`} className="banner-image" />
      </div>

      {/* Gift Cards Section */}
      <div className="gift-cards-section">
        <h2>Available Gift Cards</h2>
        <div className="gift-card-grid">
          {giftCards.map((card) => (
            <div key={card.id} className="gift-card">
              <h3>{card.platform}</h3>
              <p>Price: ${card.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
