import { BrowserRouter } from "react-router-dom";
import { Overview, Contact, Timeline, Gallery, Hero, Navbar, Works, Leo, Footer } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center absolute top-0 h-screen w-full" />
        <div className="bg-gradient-to-b from-black/0 via-black/10 to-primary w-full absolute top-0 h-screen"></div>
        <div>
          <Navbar />
          <Hero />
        </div>
        <div className="relative z-0">
          <Overview />
          <Leo />
          <Timeline />
          <Works />
          <Contact />
          <Gallery />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App