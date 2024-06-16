import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hero from './pages/Hero';
import LayoutWithHeader from './components/Layouts/LayoutWithHeader';

function App() {
 
  return (
    <div className='app w-full h-full max-lg:h-fit'>
      <Router>
        <Routes>
          <Route path="/"
            element={
              <LayoutWithHeader>
                <Home />
              </LayoutWithHeader>
            }
          />
          <Route path="/login"
            element={
              <LayoutWithHeader>
                <Home />
              </LayoutWithHeader>
            }
          />
          <Route path="/hero/:id" element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
