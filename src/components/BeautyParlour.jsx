import React from 'react';
import foundationImg from '../assets/foundation.svg';
import compactImg from '../assets/compact.svg';
import serumImg from '../assets/serum.svg';
import brushImg from '../assets/brush.svg';
import paletteImg from '../assets/palette.svg';

const BeautyParlour = () => {
  return (
    <div className="beauty-parlour">
      {/* Navigation */}
      <nav className="navigation">
        <ul className="nav-links">
          <li><a href="#home">HOME</a></li>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
      </nav>

      {/* Hero area */}
      <div className="hero container">
        <div className="content">
          <p className="eyebrow">LUXURY SALON • BEAUTY EXPERTS</p>
          <h1 className="main-title">
            BEAUTY
            <span className="title-accent"> PARLOUR</span>
          </h1>
          <p className="lead">Elevate your glow with professional treatments and bespoke beauty services.</p>
          <div className="actions">
            <button className="book-button">BOOK NOW</button>
            <button className="learn-button">OUR SERVICES</button>
          </div>
        </div>

        {/* Makeup Products (image-based collage) */}
        <div className="makeup-products">
          <div className="products-container">
            <img src={paletteImg} alt="palette" className="product product-image palette" />
            <img src={foundationImg} alt="foundation" className="product product-image foundation" />
            <img src={compactImg} alt="compact" className="product product-image compact" />
            <img src={serumImg} alt="serum" className="product product-image serum" />
            <img src={brushImg} alt="brush" className="product product-image brush" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyParlour;