import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  price,
  image,
  extra,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} className="grow basis-[500px]">
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 450,
        }}
        className={`bg-primary shadow-2xl p-5 rounded-2xl h-full w-full border-solid border-8 ${index == 0 ? "border-logo shadow-logo/70" : "shadow-white/50"}`}
      >
        <div className='relative w-full h-[330px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover object-top rounded-2xl'
          />
        </div>

        <div className='mt-5'>
          <h3 className={`${index == 0 ? "text-logo" : "text-white"}  font-bold text-[28px]`}>{name}</h3>
          <hr />
          <h3 className='mt-4 text-white font-bold text-[22px]'>{price}</h3>
          <p className='mt-2 text-secondary text-[16px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {extra.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px]`}
            >
              - {tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>Pricing</p>
        <h2 className={`${styles.sectionHeadText}`}>Services.</h2>
      </motion.div>

      <div className='mt-10 flex flex-wrap items-stretch gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "");