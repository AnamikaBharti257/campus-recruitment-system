import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaUsers, FaGraduationCap, FaChartLine } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Campus Recruitment System
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect students with top companies. Streamline the placement process.
            Build your future with our comprehensive recruitment platform.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {isAuthenticated ? (
              <Link
                to={`/${user?.role}/dashboard`}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <FaBriefcase className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-600">Access hundreds of job listings from top companies</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
                <FaUsers className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Companies</h3>
              <p className="text-gray-600">Easy job posting and candidate management</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
                <FaGraduationCap className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p className="text-gray-600">Track applications and manage your profile</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-orange-100 p-4 rounded-full inline-block mb-4">
                <FaChartLine className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Real-time placement statistics and reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up as a student or company. Complete your profile with all necessary details.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore/Post Jobs</h3>
              <p className="text-gray-600">
                Students browse jobs. Companies post openings with detailed requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply & Hire</h3>
              <p className="text-gray-600">
                Students apply for jobs. Companies review and shortlist candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-lg">Students Registered</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-lg">Companies</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">300+</p>
              <p className="text-lg">Jobs Posted</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">200+</p>
              <p className="text-lg">Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our platform today and take the first step towards your dream career.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;