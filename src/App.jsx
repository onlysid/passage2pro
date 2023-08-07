import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, Leo } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center absolute top-0 h-screen w-full" />
        <div className="bg-gradient-to-b from-black/20 via-black/30 to-primary w-full absolute top-0 h-screen"></div>
        <div>
          <Navbar />
          <Hero />
        </div>
        <div className="relative z-0">
          <About />
          <Leo />
          <Experience />
          <Works />
          <Feedbacks />
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App