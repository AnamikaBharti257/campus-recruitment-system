import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Campus Recruitment System</h1>
          <p className="text-xl opacity-90">Bridging the gap between students and employers</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Our Campus Recruitment System is designed to streamline the placement process for 
              college students and recruiting companies. We aim to create a seamless platform 
              where talent meets opportunity.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              By leveraging modern technology, we simplify job searching, application tracking, 
              and candidate management for all stakeholders involved in the campus recruitment process.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Comprehensive job search with advanced filters</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Easy application tracking and status updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Simple job posting for companies</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Candidate management and shortlisting tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Real-time placement statistics and analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span>Secure resume upload and management</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We envision a future where every student has access to quality career opportunities 
              and every company can find the perfect talent. Our platform continues to evolve 
              with the latest technology to serve the campus recruitment ecosystem better.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Platform Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a student or a company, we're here to help you succeed.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;