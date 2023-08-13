import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon, text }) => {
  return (
    <Tilt className="basis-[360px] grow flex items-stretch">
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)} className="w-full green-pink-gradient p-[3px] rounded-[20px] shadow-card">
        <div options={{ max: 45, scale: 1, speed: 450 }} className="bg-dark rounded-[20px] h-full py-5 px-12 flex justify-start items-center flex-col">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
          <p className="text-center my-3 justify-self-end">{text}</p>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>


      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl">
        P2P is a football academy that is open to both male and females aged between 6-16 who are looking to reach their best levels in the game.
      </motion.p>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl">
        The P2P ethos is to coach, support and guide players to become the best version of themselves.
      </motion.p>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl">
        Developing young players, instilling confidence and self belief in each individual while allowing allowing them to express themselves as individuals in the correct way.
      </motion.p>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl">
        For those who wish to, P2P will also assist in creating a passage way to professional and semi professional football.
      </motion.p>
      <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl">

        The long-term vision of the academy is to produce players of a standard such that if they choose, they can go on to have a career in professional or semi-professional football.
      </motion.p>

      <motion.div variants={textVariant()} className="mt-20">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <div className="mt-5 flex flex-wrap gap-10 justify-center items-stretch">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about");