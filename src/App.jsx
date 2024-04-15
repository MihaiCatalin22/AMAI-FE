import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <DefaultLayout>
      <Routes>
        
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meetings" element={<Home />} />
            <Route path="/reserve" element={<ReserveEvent />} />
            <Route path="/verify" element={<VerificationPortal />} />
            <Route path="/verifyFail" element={<VerifyFail />} />
            <Route path="/verifySuccess" element={<VerifySuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/meetings/past" element={<PastTalks />} />


        </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App