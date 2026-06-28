import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Campus<span className="text-blue-400">Recruitment</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Connecting students with top companies. Streamlining the campus placement process for better opportunities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=student" className="text-gray-400 hover:text-blue-400 transition">
                  Register as Student
                </Link>
              </li>
              <li>
                <Link to="/student/jobs" className="text-gray-400 hover:text-blue-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/student/profile" className="text-gray-400 hover:text-blue-400 transition">
                  Update Profile
                </Link>
              </li>
              <li>
                <Link to="/student/applications" className="text-gray-400 hover:text-blue-400 transition">
                  Track Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Placement Office,<br />
                  XYZ Institute of Technology,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span className="text-gray-400">placements@college.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2026 Campus Recruitment System. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with MERN Stack (MongoDB, Express.js, React, Node.js)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;