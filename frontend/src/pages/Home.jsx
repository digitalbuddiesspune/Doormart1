import React from 'react';
import MobileBottomNav from '../components/MobileBottomNav';
import HeroSlider from '../components/HeroSlider';
import DoorMartSections from '../components/TickNTrackSections';
import ScrollToTop from '../components/ScrollToTop';
import HomeFeaturedProducts from '../components/HomeFeaturedProducts';

const Home = () => {
  return (
    <div className="min-h-screen pt-0 pb-16 md:pb-0 mt-0">
      {/* Hero Slider */}
      <HeroSlider
        slides={[
          {
            desktop: 'https://res.cloudinary.com/dzd47mpdo/image/upload/v1774852336/blue_fun_cute_baby_fashion_banner_lanscape_1920_x_600_px_dkfb0a.png',
            alt: 'DoorMart - Premium Products Collection',
          },
          {
            desktop: 'https://res.cloudinary.com/dzd47mpdo/image/upload/v1774591555/banner-fmcg-2_sidqv8.jpg',
            alt: 'Festive Season Offer - DoorMart',
          },
          {
            desktop: 'https://res.cloudinary.com/dzd47mpdo/image/upload/v1774855902/Minimalist_Beauty_Skincare_Switter_Header_1920_x_600_px_1_htqzom.png',
            alt: 'Festive Season Offer - DoorMart',
          },
         
        ]}
        mobileSrc="https://res.cloudinary.com/dzd47mpdo/image/upload/v1774853133/blue_fun_cute_baby_fashion_banner_lanscape_600_x_600_px_fz9am3.png"
      />

      {/* Featured Products */}
      <HomeFeaturedProducts />

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
