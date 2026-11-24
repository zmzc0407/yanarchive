import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout, PageTransition } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Works } from '@/pages/Works';
import { BehindScenes } from '@/pages/BehindScenes';
import { Itinerary } from '@/pages/Itinerary';
import { Messages } from '@/pages/Messages';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
        <Route path="/behind-scenes" element={<PageTransition><BehindScenes /></PageTransition>} />
        <Route path="/itinerary" element={<PageTransition><Itinerary /></PageTransition>} />
        <Route path="/messages" element={<PageTransition><Messages /></PageTransition>} />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
