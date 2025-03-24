import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Search,
  X,
  User,
  MapPin,
  Award,
  Phone,
  Loader2
} from "lucide-react";
import { useTheme } from "../contex/ThemeContext";
import { format, startOfMonth, getDay, isToday, endOfMonth, eachDayOfInterval } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fixed doctor profile image
const DEFAULT_DOCTOR_IMAGE =
  "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg";
const doctorsList = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    clinic: "Heart Care Clinic",
    experience: "10 years",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Plaza, Suite 101",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 2,
    name: "Dr. Robert Smith",
    specialization: "Dermatologist",
    clinic: "Skin Health Center",
    experience: "8 years",
    phone: "+1 (555) 234-5678",
    address: "456 Wellness Avenue, Suite 202",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialization: "Pediatrician",
    clinic: "Kids Care Clinic",
    experience: "12 years",
    phone: "+1 (555) 345-6789",
    address: "789 Children's Way, Suite 303",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 4,
    name: "Dr. Michael Scott",
    specialization: "Orthopedic Surgeon",
    clinic: "Bone and Joint Center",
    experience: "15 years",
    phone: "+1 (555) 456-7890",
    address: "234 Care Drive, Suite 402",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 5,
    name: "Dr. Angela Martinez",
    specialization: "Neurologist",
    clinic: "NeuroHealth Clinic",
    experience: "9 years",
    phone: "+1 (555) 567-8901",
    address: "345 Brain Way, Suite 501",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 6,
    name: "Dr. David Wilson",
    specialization: "Oncologist",
    clinic: "Cancer Care Center",
    experience: "14 years",
    phone: "+1 (555) 678-9012",
    address: "567 Oncology Blvd, Suite 601",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 7,
    name: "Dr. Elizabeth Lee",
    specialization: "Gynecologist",
    clinic: "Women's Health Center",
    experience: "11 years",
    phone: "+1 (555) 789-0123",
    address: "789 Women Ave, Suite 303",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 8,
    name: "Dr. James Taylor",
    specialization: "Endocrinologist",
    clinic: "Hormone Balance Clinic",
    experience: "13 years",
    phone: "+1 (555) 890-1234",
    address: "123 Endocrine Street, Suite 205",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 9,
    name: "Dr. Amanda Brown",
    specialization: "Ophthalmologist",
    clinic: "Vision Center",
    experience: "10 years",
    phone: "+1 (555) 901-2345",
    address: "321 Eye Lane, Suite 404",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 10,
    name: "Dr. Mark Phillips",
    specialization: "Gastroenterologist",
    clinic: "Digestive Health Center",
    experience: "8 years",
    phone: "+1 (555) 012-3456",
    address: "654 Gastro Ave, Suite 105",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 11,
    name: "Dr. Laura Adams",
    specialization: "Rheumatologist",
    clinic: "Joint Relief Clinic",
    experience: "6 years",
    phone: "+1 (555) 123-4568",
    address: "876 Joint Street, Suite 302",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 12,
    name: "Dr. Steven Carter",
    specialization: "Pulmonologist",
    clinic: "Lung Care Clinic",
    experience: "10 years",
    phone: "+1 (555) 234-5679",
    address: "543 Pulmonary Blvd, Suite 208",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 13,
    name: "Dr. Lisa White",
    specialization: "Hematologist",
    clinic: "Blood Health Center",
    experience: "7 years",
    phone: "+1 (555) 345-6780",
    address: "109 Hematology Lane, Suite 101",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 14,
    name: "Dr. Daniel Harris",
    specialization: "Nephrologist",
    clinic: "Kidney Care Clinic",
    experience: "12 years",
    phone: "+1 (555) 456-7891",
    address: "876 Renal Blvd, Suite 205",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 15,
    name: "Dr. Emily Clark",
    specialization: "Psychiatrist",
    clinic: "Mental Wellness Center",
    experience: "9 years",
    phone: "+1 (555) 567-8902",
    address: "234 Wellness Drive, Suite 307",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 16,
    name: "Dr. John Foster",
    specialization: "ENT Specialist",
    clinic: "Ear, Nose & Throat Clinic",
    experience: "11 years",
    phone: "+1 (555) 678-9013",
    address: "432 ENT Way, Suite 408",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 17,
    name: "Dr. Sophia Young",
    specialization: "Immunologist",
    clinic: "Allergy & Immunology Center",
    experience: "8 years",
    phone: "+1 (555) 789-0124",
    address: "654 Immune Blvd, Suite 206",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 18,
    name: "Dr. Paul Parker",
    specialization: "Urologist",
    clinic: "Urinary Health Clinic",
    experience: "10 years",
    phone: "+1 (555) 890-1235",
    address: "876 Urinary Lane, Suite 502",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 19,
    name: "Dr. Karen Lewis",
    specialization: "Surgeon",
    clinic: "Precision Surgery Center",
    experience: "15 years",
    phone: "+1 (555) 901-2346",
    address: "123 Surgery Way, Suite 703",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 20,
    name: "Dr. Frank Edwards",
    specialization: "Family Physician",
    clinic: "Family Care Clinic",
    experience: "18 years",
    phone: "+1 (555) 012-3457",
    address: "987 Family Blvd, Suite 203",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 21,
    name: "Dr. Olivia Green",
    specialization: "Plastic Surgeon",
    clinic: "Aesthetic Center",
    experience: "12 years",
    phone: "+1 (555) 123-4569",
    address: "456 Aesthetic Ave, Suite 402",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 22,
    name: "Dr. Victor Allen",
    specialization: "Sports Medicine Specialist",
    clinic: "Sports Health Center",
    experience: "14 years",
    phone: "+1 (555) 234-5670",
    address: "789 Sports Drive, Suite 304",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 23,
    name: "Dr. Grace Turner",
    specialization: "Geriatrician",
    clinic: "Elderly Care Center",
    experience: "20 years",
    phone: "+1 (555) 345-6781",
    address: "101 Senior Blvd, Suite 102",
    img: DEFAULT_DOCTOR_IMAGE,
  },
  {
    id: 24,
    name: "Dr. William Carter",
    specialization: "Psychiatrist",
    clinic: "Mental Wellness Clinic",
    experience: "16 years",
    phone: "+1 (555) 456-7892",
    address: "345 Serenity Lane, Suite 505",
    img: DEFAULT_DOCTOR_IMAGE,
  },
];

const DoctorBookingApp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDoctorClick = (doctor) => {
    // Check if user is logged in by looking for user data in localStorage
    const userData = localStorage.getItem('userData');
    if (!userData) {
      // Show a nice toast notification
      toast.info('Please login to book an appointment', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDark ? "dark" : "light",
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            from: '/doctors',
            message: 'Please login to book an appointment'
          }
        });
      }, 1000);
      return;
    }
    // If logged in, proceed with booking
    navigate("/appointments", { state: { selectedDoctor: doctor } });
  };

  const filteredDoctors = doctorsList.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Loader2 className={`w-12 h-12 animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          Our Doctors
        </h1>

        {/* Search Section */}
        <div className={`mb-8 rounded-lg shadow-lg p-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-gray-200/50'
        }`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              className={`w-full p-3 pl-10 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                isDark 
                  ? 'bg-gray-800 shadow-gray-900/50 hover:shadow-gray-900/70' 
                  : 'bg-white shadow-gray-200/50 hover:shadow-gray-200/70'
              }`}
            >
              <div className="relative h-64">
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className={`text-xl font-bold text-white mb-1`}>
                    {doctor.name}
                  </h3>
                  <p className={`text-sm text-gray-200`}>
                    {doctor.specialization}
                  </p>
                </div>
              </div>
              <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="space-y-2">
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-semibold">Clinic:</span> {doctor.clinic}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-semibold">Experience:</span> {doctor.experience}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-semibold">Phone:</span> {doctor.phone}
                  </p>
                </div>
                <button
                  onClick={() => handleDoctorClick(doctor)}
                  className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorBookingApp;