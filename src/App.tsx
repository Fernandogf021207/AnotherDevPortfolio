import React from 'react';
import EditorialHighlight from './components/sections/EditorialHighlight';
import AboutEditorial from './components/sections/AboutEditorial';
import Projects from './components/sections/Projects';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const App: React.FC = () => {
  useSmoothScroll();

  return (
    <main className="bg-[#FFF8E7] text-[#2e1065] w-full overflow-hidden">
      <EditorialHighlight />
      <AboutEditorial />
      <Projects />
    </main>
  );
};

export default App;
