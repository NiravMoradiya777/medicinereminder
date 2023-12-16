import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import * as React from 'react';
import "./App.css";
import Main from "./views/Main";
import Nav from "./views/Nav";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Login/Register";
import Medications from "./views/Patient/Medication/Medications";
import CareGivers from "./views/Patient/Caregiver/CareGivers";
import PatientDashboard from "./views/Patient/Dashboard/PatientDashboard";
import CaregiverDashboard from "./views/Caregiver/Dashboard/CaregiverDashboard";
import Patient from "./views/Caregiver/Patient/Patient";
import Donation from "./views/Donation/Donation";
import PatientFromDoctor from "./views/Doctor/Patient/Patient";
import PatientFromDoctorDashBoard from "./views/Doctor/Dashboard/DoctorDashboard";

function App() {

  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    const curUser = localStorage.getItem('user');
    if (curUser === null) setAuth(false);
    else { 
        console.log(curUser);
        // setUser(JSON.parse(curUser))
        setAuth(true);
    }
}, []);

  return (
    <Router>
      <div>
        <Nav />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          {/* <Route path="/register" element={ <Register />} /> */}
          <Route path="/donation" element={ <Donation />} />
            
          <Route path="/patient/medication" element={<Medications />} />
          <Route path="/patient/caregiver" element={<CareGivers />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
          <Route path="/caregiver/patients" element={<Patient />} />

          <Route path="/doctor/patient" element={<PatientFromDoctor />} />
          <Route path="/doctor/dashboard" element={<PatientFromDoctorDashBoard />} />
          <Route path="/doctor/patient/:patientId/medication" element={<Medications />} />
          {/* {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).userType == "Patient"
            ? <Route path="/patient/medication" element={<Medications />} />
            : <Route path="*" element={<Navigate to="/login" />} />
          }
          {localStorage.getItem('user')  && JSON.parse(localStorage.getItem('user')).userType == "Patient"
            ? <Route path="/patient/caregiver" element={<CareGivers />} />
            : <Route path="*" element={<Navigate to="/login" />} />
          }
          {localStorage.getItem('user')  && JSON.parse(localStorage.getItem('user')).userType == "Patient"
            ? <Route path="/patient/dashboard" element={<PatientDashboard />} />
            : <Route path="*" element={<Navigate to="/login" />} />
          }
          {localStorage.getItem('user')  && JSON.parse(localStorage.getItem('user')).userType == "Caregiver"
            ? <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
            : <Route path="*" element={<Navigate to="/login" />} />
          }
          {localStorage.getItem('user')  && JSON.parse(localStorage.getItem('user')).userType == "Caregiver"
            ? <Route path="/caregiver/patients" element={<CaregiverDashboard />} />
            : <Route path="*" element={<Navigate to="/login" />} />
          } */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
