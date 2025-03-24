# MediBooker - Medical Appointment Booking System

MediBooker is a comprehensive medical appointment booking system that allows users to search for doctors, book appointments, and manage their medical consultations. Doctors can log in to view their appointment schedules in a calendar view.


## Features

### For Patients
- **Search for doctors** by specialization or name
- **View doctor profiles** with detailed information
- **Book appointments** by selecting preferred date and time
- **View appointment history** and upcoming appointments
- **Dark/Light mode toggle** for comfortable viewing

### For Doctors
- **Secure login** to access appointment dashboard
- **Monthly calendar view** of all scheduled appointments
- **Daily appointment details** by clicking on specific dates
- **Manage appointment status** (confirm, reschedule, cancel)

## Technology Stack

- **Frontend Framework:** React
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Data Storage:** Local Storage
- **Routing:** React Router

## Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/shubhambendkhale77/MediBooker.git
cd medibooker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
medibooker/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── assets/
│   │   └── image.png
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DoctorProfile.jsx
│   │   ├── Appointments.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Key Components

### Navbar
- Responsive navigation with mobile menu
- Dynamic theme toggle between light and dark modes
- Authentication status detection and appropriate navigation options

### HomePage
- Hero section with call-to-action
- Featured doctors section with filtering capabilities
- Information about the booking process

### DoctorProfile
- Detailed doctor information
- Availability calendar
- Appointment booking interface

### Appointments
- Calendar view of scheduled appointments
- Detailed view of appointment information
- Appointment management options

### Authentication
- User registration and login
- Doctor login with specialized dashboard
- Protected routes for authenticated users

## Local Storage Implementation

The application uses local storage to persist data across sessions:

- **User authentication status**
- **User profile information**
- **Doctor information**
- **Appointment records**

Example local storage structure:
```javascript
// User authentication
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("signupData", JSON.stringify(userData));

// Appointments
localStorage.setItem("appointments", JSON.stringify(appointmentsArray));
```

## Dark Mode Implementation

MediBooker includes a complete dark mode implementation:
- Theme toggle in the navigation bar
- Theme state managed via Context API
- Persistent theme preference using local storage
- Tailwind CSS classes for consistent styling across themes

## Responsive Design

The application is built with a mobile-first approach:
- Responsive layout for all screen sizes
- Mobile menu for smaller screens
- Optimized calendar view for both desktop and mobile

## Future Enhancements

- **Email notifications** for appointment confirmations and reminders
- **Online consultation** integration
- **Rating and review system** for doctors
- **Medical records** management
- **Multi-language support**

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.