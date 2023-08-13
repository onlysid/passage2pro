import React from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

const ProjectCard = ({
  index,
  name,
  description,
  image,
  extra,
}) => {
  return (
    <div className="grow basis-[500px]">
      <Tilt
        options={{
          max: 20,
          scale: 1,
          speed: 450,
        }}
        className={`bg-primary shadow-2xl p-5 rounded-2xl h-full w-full border-solid border-8 ${index == 0 ? "border-logo shadow-logo/70" : "shadow-white/50"}`}
      >
        <div className='relative w-full h-[300px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover object-center rounded-2xl'
          />
        </div>

        <div className='mt-5'>
          <h3 className={`${index == 0 ? "text-logo" : "text-white"}  font-bold text-[28px] mb-3`}>{name}</h3>
          <hr />
          <p className='mt-3 text-secondary text-[16px]'>{description}</p>
        </div>

        <div className='my-4 flex flex-wrap gap-2'>
          {extra.map((tag) => (
            <h3
              key={`${tag}-${index}`}
              className={`text-[18px] font-bold`}
            >
              {tag}
            </h3>
          ))}
        </div>
        <hr />
      </Tilt>
    </div>
  );
};

const Services = () => {
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} `}>Pricing</p>
        <h2 className={`${styles.sectionHeadText}`}>Services.</h2>
      </div>

      <hr />
      <div>
        <p className={`${styles.sectionSubText} my-8 text-center`}>* All courses run for 6 weeks</p>
      </div>

      <div className='my-10 flex flex-wrap items-stretch gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <hr />

    </>
  );
};

export default SectionWrapper(Services, "services");