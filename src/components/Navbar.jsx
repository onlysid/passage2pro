import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { logo } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={`${styles.paddingX} w-full flex items-center justify-center py-0 fixed top-0 z-20`}>
      <div className="bg-[#090909] w-[150%] -top-20 absolute -left-[25%] -z-10 blur-xl py-[100px]"></div>
      <div className="w-full flex gap-8 justify-between items-center max-w-7xl mx-auto py-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => {
          setActive("");
          window.scrollTo(0, 0)
        }}>
          <img src={logo} alt="logo" className="h-28 lg:h-32 object-contain" />
        </Link>
        <a href="#contact" className="bg-logo max-w-max text-dark shadow-2xl shadow-gray px-8 py-4 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 lg:hover:shadow-white lg:hover:bg-primary lg:hover:text-white lg:hover:rounded-tr-none lg:hover:rounded-bl-none lg:hover:rounded-tl-xl lg:hover:rounded-br-xl lg:hover:tracking-widest relative group lg:hover:px-12">Book Now!<span className="absolute w-full max-w-0 transition-all duration-500 group-hover:max-w-3xl -bottom-4 h-[5px] bg-white left-0 rounded-full origin-left shadow-white shadow-2xl"></span></a>


        {/* <div className="transition-all duration-300 group hover:scale-110">
          <a href="/#contact" className="px-6 py-3 rounded-xl bg-tertiary text-dark shadow-secondary shadow-2xl transition-all duration-300 group-hover:bg-dark group-hover:shadow-secondary group-hover:text-white scale-100 group-hover:scale-110">Book now</a>
        </div> */}
      </div>
    </nav>
  )
}

export default Navbar