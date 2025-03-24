import React from "react";
import { useTheme } from "../contex/ThemeContext";
import {
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  Mail,
  Search,
  User,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${isDarkMode ? 'bg-dark text-dark-text' : 'bg-gray-900 text-gray-100'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-full flex items-center justify-center transition-colors duration-300`}>
                <PhoneCall className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">MediBook</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                  Your Health, Our Priority
                </p>
              </div>
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'} leading-relaxed`}>
              MediBook is a leading doctor appointment booking platform,
              connecting patients with healthcare professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200 flex items-center gap-2`}>
                  <ArrowRight className="h-4 w-4" />
                  Find Doctors
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200 flex items-center gap-2`}>
                  <ArrowRight className="h-4 w-4" />
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200 flex items-center gap-2`}>
                  <ArrowRight className="h-4 w-4" />
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200 flex items-center gap-2`}>
                  <ArrowRight className="h-4 w-4" />
                  Health Blog
                </a>
              </li>
              <li>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200 flex items-center gap-2`}>
                  <ArrowRight className="h-4 w-4" />
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-300'} flex-shrink-0 mt-1`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                  Koregaon Park
                  <br />
                  Pune, Maharashtra, India, 411001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneCall className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>+91 8149250536</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>shubhambendkhale77@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold">Stay Updated</h4>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`}>
              Subscribe to our newsletter for health tips and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className={`px-4 py-2 ${
                  isDarkMode ? 'bg-dark-card text-gray-300' : 'bg-gray-800 text-gray-200'
                } rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              />
              <button className={`${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-4 py-2 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-700'} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-300'} text-sm mb-4 md:mb-0`}>
            © {new Date().getFullYear()} MediBook. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
              Terms of Service
            </a>
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-200`}>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
