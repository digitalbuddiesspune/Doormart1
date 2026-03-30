import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Truck, Shield, RotateCcw, HeadphonesIcon, MessageCircle } from 'lucide-react';
import { api } from '../utils/api';
import brandLogo from '../assets/Logo.png';

/** Static footer contact — not loaded from admin API */
const CONTACT_INFO = {
  email: 'Avtextileprivatelimited@gmail.com',
  phone: '8920426017',
  address: 'P Block, Property Bearing No. P-4, Vijay Vihar, Uttam Nagar, New Delhi, South West Delhi, Delhi - 110059',
  companyName: 'DoorMart',
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerLogo, setFooterLogo] = useState({
    url: brandLogo,
    alt: 'DoorMart',
    width: 'auto',
    height: 'auto',
  });

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    try {
      const logo = await api.getLogo('footer').catch(() => null);
      if (logo) {
        setFooterLogo({ 
          url: logo.url, 
          alt: logo.alt || 'DoorMart',
          width: logo.width || 'auto',
          height: logo.height || 'auto',
        });
      }
    } catch (err) {
      console.error('Failed to load footer logo:', err);
    }
  };

  useEffect(() => {
    // Listen for logo updates
    const handleLogoUpdate = (event) => {
      if (event.detail.type === 'footer') {
        loadLogo();
      }
    };
    window.addEventListener('logo:updated', handleLogoUpdate);
    return () => window.removeEventListener('logo:updated', handleLogoUpdate);
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const trustFeatures = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders above ₹999' },
    { icon: Shield, title: 'Secure Payment', description: '100% secure transactions' },
    { icon: RotateCcw, title: 'Easy Returns', description: '7-day return policy' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Dedicated customer care' },
  ];

  // Extract phone number without +91 for WhatsApp link
  const whatsappNumber = CONTACT_INFO.phone.replace(/[\s+-]/g, '').replace(/^91/, '');

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: 'https://instagram.com/doormart',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: 'https://facebook.com/doormart',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      url: `https://wa.me/${whatsappNumber}`,
    },
  ];

  return (
    <>
      <style>{`
      .footer-link {
          color: #111827;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #000000;
        }
      `}</style>
      <footer className="w-full bg-white text-black">
      {/* Trust Strip */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-1.5 md:py-2 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-1 bg-white rounded-lg p-1 sm:p-1 border border-gray-200">
                <div className="flex-shrink-0 w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-gray-100">
                  <IconComponent className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-black" />
                </div>
                <div className="min-w-0 flex-1">
                  <h6 className="font-semibold text-[11px] sm:text-xs md:text-sm leading-tight text-black">{feature.title}</h6>
                  <p className="text-[9.5px] sm:text-[11px] md:text-xs text-gray-700 leading-tight mt-0.5">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-6 py-2 sm:py-3 md:py-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Brand Section */}
          <div>
            <div className="mb-2 sm:mb-3">
              <img 
                src={footerLogo.url}
                alt={footerLogo.alt || CONTACT_INFO.companyName}
                style={{
                  ...(footerLogo.width !== 'auto' && { width: footerLogo.width }),
                  ...(footerLogo.height !== 'auto' && { height: footerLogo.height }),
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
                className={footerLogo.width === 'auto' && footerLogo.height === 'auto' 
                  ? "h-24 sm:h-28 w-auto object-contain mb-2" 
                  : "object-contain mb-2"}
                onError={(e) => {
                  e.target.src = brandLogo;
                }}
              />
              <p className="text-sm sm:text-base leading-relaxed max-w-md text-gray-700">
                Your trusted destination for premium kids & baby products. 
                We bring you the finest collection of clothing, accessories, and toys for your little ones.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0 text-black" />
                <span className="text-sm sm:text-base break-words leading-relaxed">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0 text-black" />
                <span className="text-sm sm:text-base break-all leading-relaxed">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0 text-black" />
                <span className="text-sm sm:text-base break-words leading-relaxed">{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pt-20 lg:pt-40">
            <h5 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg text-black">Quick Links</h5>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="footer-link opacity-90 hover:opacity-100 active:opacity-100 transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 bg-black"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:pt-20 lg:pt-40">
            <h5 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg text-black">Policies</h5>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/privacy" className="footer-link opacity-90 hover:opacity-100 transition-colors duration-200 text-sm sm:text-base touch-manipulation">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link opacity-90 hover:opacity-100 transition-colors duration-200 text-sm sm:text-base touch-manipulation">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="footer-link opacity-90 hover:opacity-100 transition-colors duration-200 text-sm sm:text-base touch-manipulation">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-cancellation" className="footer-link opacity-90 hover:opacity-100 transition-colors duration-200 text-sm sm:text-base touch-manipulation">
                  Refund/Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-200">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-6 py-1 sm:py-1.5 md:py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-black text-center sm:text-left">
              © {currentYear} {CONTACT_INFO.companyName}. All Rights Reserved
            </div>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
                  style={{ backgroundColor: '#F3F4F6', color: '#000000' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E5E7EB';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = '#E5E7EB';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                      e.currentTarget.style.color = '#000000';
                    }, 150);
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
