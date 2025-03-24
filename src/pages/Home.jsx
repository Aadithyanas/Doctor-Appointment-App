import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import image from "../assets/image.png";
import Footer from "./Footer";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const { isDarkMode } = useTheme();

  const specialties = [
    "General Practice",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const doctors = [
    {
      id: 1,
      name: "Adithyan.A.S",
      specialty: "Cardiology",
      rating: 4.9,
      availableToday: true,
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQGZDemP3SEEZQ/profile-displayphoto-shrink_400_400/B56ZSYoR.5HoAk-/0/1737727484513?e=1747872000&v=beta&t=44EnBtxRT5n2_Xor0h620VeQcR7yfhUoyMOF0W8PxDA",
    },
    {
      id: 2,
      name: "Dr. Shivateja Keerthi",
      specialty: "Pediatrics",
      rating: 4.8,
      availableToday: true,
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQH3qz1XKeKG4Q/profile-displayphoto-shrink_400_400/B56ZUP8EG_HsAs-/0/1739729159008?e=1747872000&v=beta&t=n7LXfMVueWxWtYOJcwdkTA3tO5tqo0-cS5W2biaQT4Y",
    },
    {
      id: 3,
      name: "Dr. Karthik K",
      specialty: "Gynecologist",
      rating: 4.7,
      availableToday: false,
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQEuTjQhWJw8Bw/profile-displayphoto-shrink_400_400/B4EZVqEMr9HUAg-/0/1741241245172?e=1747872000&v=beta&t=_F1mTKeyjyiN_AgmXRXsFtKeRiq38sHJnl3jfGfTrB8",
    },
    {
      id: 4,
      name: "Dr. Prashant Palve",
      specialty: "Neurology",
      rating: 4.9,
      availableToday: false,
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQG1j7A1h6Kdsw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704635915169?e=1747872000&v=beta&t=SuEDqy5rM8NnTgIBZh0WMB7Gi6ImyQE5oyXWhODVaLQ",
    },
  ];

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/doctor-profile");
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialtyFilter === "" || doctor.specialty === specialtyFilter)
    );
  });

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-dark text-dark-text' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden rounded-lg w-full ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800 w-full' : 'bg-gradient-to-r from-blue-500 to-blue-600'} transition-colors duration-300`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10 rounded-lg"></div>
        <div className="container mx-auto px-4 py-16 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-8 rounded-lg">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in">
                Find & Book Appointments With Top Doctors
              </h1>
              <p className="text-lg text-blue-100 animate-slide-up">
                Enjoy hassle-free appointment booking with the best healthcare
                professionals in your area. Whether you need a general
                consultation, specialist care, or follow-up visits, we make it
                easy to connect with trusted doctors.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleRedirect} 
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white hover:bg-blue-50 text-blue-600'
                  } transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  Book Appointment
                </button>
                <button 
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    isDarkMode
                      ? 'bg-blue-800 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={image}
                alt="Doctor with patient"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className={`py-8 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} shadow-lg transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                    isDarkMode 
                      ? 'bg-dark border-gray-700 text-gray-200 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg appearance-none ${
                    isDarkMode 
                      ? 'bg-dark border-gray-700 text-gray-200 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <ArrowRight className={`absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className={`py-16 ${isDarkMode ? 'bg-dark' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Our Featured Doctors
            </h2>
            <button
              onClick={handleRedirect}
              className={`flex items-center ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              } transition-colors duration-200`}
            >
              View All Doctors <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`rounded-lg p-6 ${
                  isDarkMode 
                    ? 'bg-dark-card hover:bg-dark-card/80' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-16 w-16 rounded-full object-cover mr-4 ring-2 ring-blue-500"
                  />
                  <div>
                    <h3 className="font-bold text-lg">
                      {doctor.name}
                    </h3>
                    <p className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="text-yellow-400">★★★★★</div>
                    <span className="ml-1">
                      {doctor.rating}
                    </span>
                  </div>
                  {doctor.availableToday && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Available Today
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleRedirect} 
                  className={`w-full py-2 rounded-lg font-semibold ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className={`text-center p-8 rounded-lg ${
              isDarkMode ? 'bg-dark-card' : 'bg-white'
            } shadow-lg`}>
              <p className="text-lg">
                No doctors found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 ${isDarkMode ? 'bg-dark-card' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              } transition-colors duration-300`}>
                <Search className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className="text-xl font-bold">Find a Doctor</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Search for doctors by specialty, location, or availability to
                find the perfect match for your needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              } transition-colors duration-300`}>
                <Calendar className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className="text-xl font-bold">Book Appointment</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Select your preferred date and time slot from the doctor's
                available schedule.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${
                isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
              } transition-colors duration-300`}>
                <PhoneCall className={`h-8 w-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className="text-xl font-bold">Get Care</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Visit your doctor at the scheduled time and receive the care
                you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;