import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { FootballCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[-28px] lg:left-[37px] max-w-7xl mx-auto flex flex-row items-center gap-5 z-10`}>
        <div className="hidden lg:flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-logo" />
          <div className="w-1 h-40 sm:h-80 gold-gradient" />
        </div>
        <div className="w-full flex flex-col justify-center">
          <h1 className={`${styles.heroHeadText} text-white text-center lg:text-start`}>Welcome to <span className="text-logo">P2P</span></h1>
          <p className={`${styles.heroSubText} mt-2 mb-8 text-white-100 max-w-4xl text-center lg:text-start`}>Developing boys and girls to their best levels, creating a passage to professional and semiprofessional football</p>
          <a href="#contact" className="bg-logo self-center lg:self-start max-w-max text-dark shadow-2xl shadow-gray px-8 py-4 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-primary hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl hover:tracking-widest relative group hover:px-12">Book Now!<span className="absolute w-full max-w-0 transition-all duration-500 group-hover:max-w-3xl -bottom-4 h-[5px] bg-white left-0 rounded-full origin-left shadow-white shadow-2xl"></span></a>
        </div>
      </div>

      {/* <div className="absolute top-0 w-full h-screen flex justify-center items-center z-0">
        <FootballCanvas />
      </div> */}

      <div className="absolute xs:bottom-10 bottom-32 w-full justify-center items-center">
        <a className="flex justify-center" href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white justify-center items-start p-2">
            <motion.div animate={{ y: [0, 24, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }} className="w-3 h-3 rounded-full bg-white mb-1" />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero