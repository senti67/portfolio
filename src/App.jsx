import { useState } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
export default function App(){
  const [loaded,setLoaded]=useState(false);
  return(
<>
  {!loaded && <Loader onDone={() => setLoaded(true)} />}
  <div className="crt-flicker" style={{ opacity: 1 }}>
    <CustomCursor />
    <Navbar />
    <main>

          <Hero key={loaded?'loaded':'hidden'}/>
          <Marquee/>
          <About/>
          <Projects/>
          <Contact/>
        </main>
        <Footer/>
      </div>
    </>
  );
}
