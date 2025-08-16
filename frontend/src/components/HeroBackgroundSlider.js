import React from "react";
import Slider from "react-slick";
import "./HeroBackgroundSlider.css"; // see style below

const images = [
  "/food1.png",
  "/food2.png",
  "/food3.png",
  "/food4.png",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
  // add your own images here
];

export default function HeroBackgroundSlider() {
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3700,
    arrows: false,
    dots: false,
    fade: true
  };

  return (
    <div className="hero-bg-slider">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={`slide-${idx}`} className="hero-bg-slider-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
