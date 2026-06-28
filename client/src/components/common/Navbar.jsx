import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FaUser className="text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Campus<span className="text-blue-600">Recruitment</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Public Links */}
            {!isAuthenticated && (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Contact
                </Link>
              </>
            )}

            {/* Authenticated User Links */}
            {isAuthenticated && (
              <>
                {user.role === 'student' && (
                  <>
                    <Link to="/student/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Dashboard
                    </Link>
                    <Link to="/student/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Jobs
                    </Link>
                    <Link to="/student/applications" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Applications
                    </Link>
                    <Link to="/student/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Profile
                    </Link>
                  </>
                )}

                {user.role === 'company' && (
                  <>
                    <Link to="/company/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Dashboard
                    </Link>
                    <Link to="/company/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      My Jobs
                    </Link>
                    <Link to="/company/post-job" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Post Job
                    </Link>
                    <Link to="/company/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Profile
                    </Link>
                  </>
                )}

                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Dashboard
                    </Link>
                    <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Users
                    </Link>
                    <Link to="/admin/jobs" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Jobs
                    </Link>
                    <Link to="/admin/stats" className="text-gray-700 hover:text-blue-600 font-medium transition">
                      Statistics
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                    <FaUser />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {/* Public Links */}
              {!isAuthenticated && (
                <>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                  <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-blue-600 font-semibold" onClick={() => setMobileMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}

              {/* Authenticated User Links */}
              {isAuthenticated && (
                <>
                  {user.role === 'student' && (
                    <>
                      <Link to="/student/dashboard" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/student/jobs" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Jobs
                      </Link>
                      <Link to="/student/applications" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Applications
                      </Link>
                      <Link to="/student/profile" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Profile
                      </Link>
                    </>
                  )}

                  {user.role === 'company' && (
                    <>
                      <Link to="/company/dashboard" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/company/jobs" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        My Jobs
                      </Link>
                      <Link to="/company/post-job" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Post Job
                      </Link>
                      <Link to="/company/profile" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Profile
                      </Link>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Users
                      </Link>
                      <Link to="/admin/jobs" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Jobs
                      </Link>
                      <Link to="/admin/stats" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Statistics
                      </Link>
                    </>
                  )}

                  {/* User Info & Logout */}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                        <FaUser />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-gray-500 capitalize text-sm">{user?.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;