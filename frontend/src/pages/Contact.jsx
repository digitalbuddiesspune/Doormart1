import ScrollToTop from '../components/ScrollToTop';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-14 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-gray-900">
            CONTACT US
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 italic max-w-2xl mx-auto">
            We'd love to hear from you
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-wider mb-4 text-gray-900">
              GET IN TOUCH
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Have a question about our FMCG products or need assistance with your order? We're here to help - reach out anytime.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 text-center">
                A V TEXTILEHUB PRIVATE LIMITED
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 sm:space-x-4 p-5 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold">
                  @
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-sm sm:text-base text-gray-700 break-words">
                    <a
                      href="mailto:Avtextileprivatelimited@gmail.com"
                      className="hover:text-amber-600 transition-colors break-all"
                    >
                      Avtextileprivatelimited@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4 p-5 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold">
                  +
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-sm sm:text-base text-gray-700 break-words">8920426017</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4 p-5 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold">
                #
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                  P Block, Property Bearing No. P-4, Vijay Vihar, Uttam Nagar, New Delhi, South West Delhi, Delhi - 110059
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <ScrollToTop />
    </div>
  );
};

export default Contact;
