import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DefaultLayout from './layouts/DefaultLayout';
import PastTalks from './pages/PastMeetings';
import PresentationForm from './components/PresentationForm';
import ReserveEvent from './pages/ReserveEvent';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <DefaultLayout>
      <Routes>
        
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meetings" element={<Home />} />
            <Route path="/meetings/past" element={<PastTalks />} />
            <Route path="/reserve" element={<ReserveEvent />} />
            <Route path="/about" element={<About />} />
        </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App