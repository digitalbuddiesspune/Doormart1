import ScrollToTop from '../components/ScrollToTop';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-gray-900">
            ABOUT US
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 italic max-w-3xl mx-auto">
            Curated FMCG essentials for everyday life
          </p>
        </div>

        {/* Our Story Section */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At avfmcgdelivery, we bring you trusted FMCG products for home and family. From daily cleaning and household utility to snacks, beverages, and kids & baby essentials, our "Our Products" collection is curated for quality, consistency, and confidence.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We work to make everyday shopping simple: easy to browse, reliable in delivery, and supported by a customer-first approach. Whether you stock up for the week or discover something new, you can shop with peace of mind.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-20 text-center bg-gradient-to-br from-amber-50 via-white to-white border border-amber-100 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-3xl font-medium tracking-wide mb-6 text-gray-900">
            OUR VISION
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To make trusted FMCG accessible to every household - by focusing on premium quality, safe products for kids, and dependable service from checkout to doorstep.
          </p>
        </div>

        {/* What Makes Us Special */}
        <div className="mb-20">
          <h2 className="text-3xl font-medium tracking-wide mb-12 text-gray-900 text-center">
            WHAT MAKES avfmcgdelivery DIFFERENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            <div className="flex items-start space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-semibold">
                Q
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality You Can Trust</h3>
                <p className="text-gray-700 leading-relaxed">
                  We curate products with careful attention to quality and performance - so you get results you can count on.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-semibold">
                S
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe and Gentle for Kids</h3>
                <p className="text-gray-700 leading-relaxed">
                  From everyday essentials to baby-friendly categories, we prioritize safety and comfort for your little ones.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-semibold">
                E
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Everyday Essentials, Simplified</h3>
                <p className="text-gray-700 leading-relaxed">
                  Find FMCG staples for your home - cleaning & household utility, snacks & beverages, and more - in one place.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-semibold">
                D
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Seamless Shopping Experience</h3>
                <p className="text-gray-700 leading-relaxed">
                  Browse quickly, order confidently, and get reliable delivery. Shopping your daily essentials should feel effortless.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Closing Message */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-10 shadow-sm text-white">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-wide mb-4">
            EXPERIENCE FMCG SHOPPING WITH CONFIDENCE
          </h2>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-5">
            Stock up on the essentials your home needs - curated categories with quality-first sourcing and reliable service.
          </p>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
            From cleaning & household utility to snacks and kids & baby products, avfmcgdelivery helps you keep everyday life running smoothly.
          </p>
          <p className="text-lg font-medium text-amber-200 italic">
            Discover your essentials. Only at avfmcgdelivery.
          </p>
        </div>

      </div>
      <ScrollToTop />
    </div>
  );
};

export default About;
