import React from 'react';
import Collections from '../components/Collections';
import MobileBottomNav from '../components/MobileBottomNav';
import HeroSlider from '../components/HeroSlider';
import DoorMartSections from '../components/TickNTrackSections';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div className="min-h-screen pt-0 pb-16 md:pb-0 mt-0">
      {/* Hero Slider */}
      <HeroSlider
        slides={[
          {
            desktop: 'https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591555/banner-fmcg-2_sidqv8.jpg',
            alt: 'DoorMart - Premium Products Collection',
          },
          {
            desktop: 'https://res.cloudinary.com/dzd47mpdo/image/upload/v1774422272/Untitled_1920_x_600_px_16_qkdbcw.png',
            alt: 'Festive Season Offer - DoorMart',
          },
         
        ]}
        mobileSrc="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774853133/blue_fun_cute_baby_fashion_banner_lanscape_600_x_600_px_fz9am3.png"
      />

      {/* DoorMart Sections */}
      <DoorMartSections />

      {/* Featured Collections */}

       
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Home;
