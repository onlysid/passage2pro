import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { testimonials } from '../constants';

const TestimonialCard = ({ index, testimonial, name, designation, company, image }) => {
  return (
    <motion.div variants={fadeIn("", "spring", index * 0.5, 0.75)} className="bg-primary p-10 rounded-3xl xs:w-[320px] w-full">
      <p className="text-white font-black text-[48px]">"</p>
      <div className="mt-1">
        <p className="text-white tracking-wider text-lg">{testimonial}</p>
        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-base"><span className="green-text-gradient">@</span> {name}</p>
            <p className="mt-1 text-secondary text-xs">{designation} of {company}</p>
          </div>
          <img src={image} alt={`feedback-by-${name}`} className="h-10 w-10 rounded-full object-cover" />
        </div>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px] shadow-2xl shadow-white`}>
      <div
        className={`bg-logo rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} !text-dark`}>What others say</p>
          <h2 className={`${styles.sectionHeadText} !text-dark`}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap justify-center gap-7`}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials")