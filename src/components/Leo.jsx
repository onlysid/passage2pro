import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { leostats, technologies } from '../constants';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { logo, star } from '../assets';
import { BallCanvas } from "./canvas";


const Leo = () => {
    return (
        <>
            <motion.div variants={textVariant()} className="text-center">
                <p className={styles.sectionSubText}>About Your Coach</p>
                <h2 className={styles.sectionHeadText}>Leo Roget</h2>
            </motion.div>


            <div className="flex flex-row flex-wrap justify-center gap-x-2 lg:gap-x-14 py-4">
                {technologies.map((technology) => {
                    return <div className="w-36 lg:w-48 h-36 lg:h-48" key={technology.name}>
                        <BallCanvas icon={technology.icon} />
                    </div>
                })}
            </div>

            <div className="flex gap-20 justify-around items-center mt-8">

                <Tilt options={{ scale: 1, speed: 5000, perspective: 3000, max: 20 }} className="basis-[300px] grow shrink-0 max-w-[500px] h-[720px]">
                    <motion.div variants={fadeIn("right", "spring", 0.5 * 0.75)} className="w-full green-pink-gradient p-[3px] rounded-[20px] shadow-card h-full">
                        <div options={{ max: 45, scale: 1, speed: 450 }} className="bg-dark relative overflow-hidden rounded-[20px] w-full h-full flex flex-col justify-evenly items-center">
                            <div className="grow pt-6 relative top-0 w-full overflow-hidden">

                                <img src={leostats.image} alt="Leo" className="object-contain object-top absolute w-full h-full" />
                                <div className="w-full h-full pointer-events-none bg-gradient-to-b from-transparent absolute top-0 via-transparent to-black"></div>
                            </div>
                            <img src={logo} alt="p2p-shield" className="absolute h-24 sm:h-32 top-6 right-8" />
                            <div className="px-3 pt-8 pb-3 bg-black w-full">
                                <div className="w-full rounded-2xl relative h-full bg-white/90 py-4 px-5">
                                    <div className="star-rating absolute -top-14 left-0 flex w-full justify-center gap-2">

                                        <img src={star} alt="star" className="w-10" />
                                        <img src={star} alt="star" className="w-10" />
                                        <img src={star} alt="star" className="w-10" />
                                        <img src={star} alt="star" className="w-10" />
                                        <img src={star} alt="star" className="w-10" />
                                    </div>


                                    <h3 className="text-dark text-[28px] sm:text-[30px] uppercase font-bold text-center">Leo Roget</h3>
                                    <div className="w-full h-0.5 bg-dark rounded-full mb-0.5"></div>
                                    <div className="w-full h-0.5 bg-dark rounded-full mb-0.5"></div>
                                    <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-dark text-[15px] sm:text-[16px] text-center max-w-lg">
                                        Leo is an-ex professional footballer, playing just short of 300 games. Representing clubs such as Brentford, Southend, Oxford, Reading & Stockport County among others.
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Tilt>
            </div>

            <div className="w-full flex items-center flex-col mt-8">

                <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl text-center">
                    Having coached at a professional and semi-professional level and with over 15 years' experience, Leo has the knowledge and expertise to bring the best out of aspiring footballers.
                </motion.p>
                <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl text-center">
                    Leo is a level 3 licensed UEFA B qualified coach and P2P is a fully insured and licensed football academy.
                </motion.p>
                <motion.p variants={fadeIn("", "", 0.1, 1)} className="mt-4 text-secondary text-[17px] max-w-3xl text-center">
                    The academy welcomes both male and females of all abilities with the intension of developing each individual to be the best they can be.
                </motion.p>
            </div>

        </>
    )
}

export default SectionWrapper(Leo, "leo");