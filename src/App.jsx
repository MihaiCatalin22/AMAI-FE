import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <DefaultLayout>
      <h1>Group Project</h1>
      <Routes>
        
            <Route index element= {<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/talks" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Home />} />
        </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </div>
  );
}

export default App