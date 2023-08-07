import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={`${styles.paddingX} w-full flex items-center justify-center py-0 fixed top-0 z-20`}>
      <div className="bg-[#090909] w-[150%] -top-20 absolute -left-[25%] -z-10 blur-xl py-[100px]"></div>
      <div className="w-full flex justify-center items-center max-w-7xl mx-auto py-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => {
          setActive("");
          window.scrollTo(0, 0)
        }}>
          <img src={logo} alt="logo" className="h-32 object-contain" />
        </Link>

        {/* <div className="transition-all duration-300 group hover:scale-110">
          <a href="/#contact" className="px-6 py-3 rounded-xl bg-tertiary text-dark shadow-secondary shadow-2xl transition-all duration-300 group-hover:bg-dark group-hover:shadow-secondary group-hover:text-white scale-100 group-hover:scale-110">Book now</a>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar