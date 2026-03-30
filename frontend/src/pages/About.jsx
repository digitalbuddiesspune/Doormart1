import ScrollToTop from '../components/ScrollToTop';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest mb-6 text-black">
            ABOUT US
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 italic">Curated FMCG essentials for everyday life</p>
        </div>

        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At DoorMart, we bring you trusted FMCG products for home and family. From daily cleaning and household utility to snacks, beverages, and kids & baby essentials, our “Our Products” collection is curated for quality, consistency, and confidence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We work to make everyday shopping simple: easy to browse, reliable in delivery, and supported by a customer-first approach. Whether you stock up for the week or discover something new, you can shop with peace of mind.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-3xl mx-auto mb-20 text-center bg-gradient-to-br from-amber-50 to-white border-2 border-amber-100 rounded-lg p-12 shadow-lg">
          <h2 className="text-3xl font-light tracking-wider mb-6 text-black">
            OUR VISION
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To make trusted FMCG accessible to every household—by focusing on premium quality, safe products for kids, and dependable service from checkout to doorstep.
          </p>
        </div>

        {/* What Makes Us Special */}
        <div className="mb-20">
          <h2 className="text-3xl font-light tracking-wider mb-12 text-black text-center">
            WHAT MAKES DOORMART OUR PRODUCTS SPECIAL?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="flex items-start space-x-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl text-amber-600">🧵</div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Premium Quality You Can Trust</h3>
                <p className="text-gray-700 leading-relaxed">
                  We curate products with careful attention to quality and performance—so you get results you can count on.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl text-amber-600">✨</div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Safe &amp; Gentle for Kids</h3>
                <p className="text-gray-700 leading-relaxed">
                  From everyday essentials to baby-friendly categories, we prioritize safety and comfort for your little ones.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl text-amber-600">🎨</div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Everyday Essentials, Simplified</h3>
                <p className="text-gray-700 leading-relaxed">
                  Find FMCG staples for your home—cleaning &amp; household utility, snacks &amp; beverages, and more—in one place.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl text-amber-600">🛍️</div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">Seamless Shopping Experience</h3>
                <p className="text-gray-700 leading-relaxed">
                  Browse quickly, order confidently, and get reliable delivery. Shopping your daily essentials should feel effortless.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Closing Message */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light tracking-wider mb-8 text-black">
            EXPERIENCE FMCG SHOPPING WITH CONFIDENCE
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Stock up on the essentials your home needs—curated categories with quality-first sourcing and reliable service.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            From cleaning &amp; household utility to snacks and kids &amp; baby products, DoorMart helps you keep everyday life running smoothly.
          </p>
          <p className="text-xl font-light text-amber-700 italic tracking-wide">
            Discover your essentials. Only at DoorMart.
          </p>
        </div>

      </div>
      <ScrollToTop />
    </div>
  );
};

export default About;