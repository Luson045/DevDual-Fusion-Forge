import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import Lottie from 'lottie-react'
import Login from './dashboard/login';
import ForgotPassword from './dashboard/ForgotPassword';
import SuperAdminPage from './dashboard/superadmin';

// import LockedView from './timetableviewer/viewer';
import Navbar from './components/home/Navbar';
import RegistrationForm from './dashboard/register';
import AllocatedRolesPage from './dashboard/allotedworks';
import MergePDFComponent from './filedownload/mergepdfdocuments';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage.jsx';
import animation404 from '../public/404.json';
import { LogoAnimation } from './components/login/LogoAnimation.jsx';
import ServicePage from './pages/Service';
import UserManagement from './dashboard/userManagement';
import Form from './platform/Form.jsx';

function App() {
  
  return (
    <Router>
      {/* <div className="app"> */}

      {/* <h1>XCEED-Timetable Module</h1>  */}
       <Navbar />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        <Route path="/services/:serviceId" element={<ServicePage />} />
        {/* ********* */}

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/userroles" element={<AllocatedRolesPage />} />
        <Route path="/superadmin" element={<SuperAdminPage />} />
        <Route path="/usermanagement" element={<UserManagement />} />

        <Route path='test-message' element={<ErrorPage 
                    message='Custom error message...' 
                    destinationName={false}
                    animation={<LogoAnimation style={{opacity:'20%'}} />}  // any type of component can be sent here
                    />}></Route>
        <Route path='*' element={<ErrorPage 
                    message='The page you are looking for does not exist...' 
                    destination='/'
                    destinationName='Home' 
                    animation={<Lottie animationData ={animation404} style={{opacity:'15%'}}/>} 
                    />}></Route>

        <Route path="/platform" element={<><Form/></>}/>
      </Routes>
      {/* <Footer/> */}
      {/* </div> */}
    </Router>
  );
}

export default App;