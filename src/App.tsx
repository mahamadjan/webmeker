
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-[var(--background)]">
        <Navbar />
        <main className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
