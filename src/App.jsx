import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Occasions from './pages/Occasions';
import Gallery from './pages/Gallery';
import Ideas from './pages/Ideas';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
