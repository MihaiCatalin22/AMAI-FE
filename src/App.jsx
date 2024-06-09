import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Home from './pages/Home';
import About from './pages/About';
import DefaultLayout from './layouts/DefaultLayout';
import PastTalks from './pages/PastMeetings';
import ReserveEvent from './pages/ReserveEvent';
import RegisterSuccess from './pages/account/RegisterSuccess';
import Register from './pages/account/Register'
import Login from './pages/account/Login'
import VerificationPortal from './pages/account/VerificationPortal';
import VerifyFail from './pages/account/VerifyFail';
import VerifySuccess from './pages/account/VerifySuccess';
import MeetingInfo from './pages/MeetingInfo';
import MeetingUpdatePage from './pages/MeetingUpdatePage';
import ProfilePage from './pages/account/ProfilePage';
import Logout from './pages/account/Logout';
import ProtectedRoute from './api/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <AuthProvider>
      <DefaultLayout>
      <Routes>
        
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meetings" element={<Home />} />

            <Route path="/verify" element={<VerificationPortal />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/verifyFail" element={<VerifyFail />} />
            <Route path="/verifySuccess" element={<VerifySuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerSuccess" element={<RegisterSuccess/>} />
            <Route path="/about" element={<About />} />
            <Route path="/meetings/past" element={<PastTalks />} />
            <Route path='/meeting/:id' element={<MeetingInfo/>}/>
            <Route path="/reserve" element={<ProtectedRoute element={ReserveEvent } requiredRoles={['SPEAKER', 'ADMIN']} />} />
            <Route path="/meetings/:id/update" element={<MeetingUpdatePage />} />
            <Route path="/profile" element={<ProtectedRoute element={ProfilePage } requiredRoles={['SPEAKER', 'ADMIN', 'USER']} />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

        </Routes>
        </DefaultLayout>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App