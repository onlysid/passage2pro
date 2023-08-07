import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import 'react-vertical-timeline-component/style.min.css';
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExpecienceCard = ({ experience }) => {
  return <VerticalTimelineElement
    contentStyle={{ background: '#2d2e32', color: '#fff' }} contentArrowStyle={{ borderRight: '7px solid #232631' }} date={experience.date} iconStyle={{ background: "#2d2e32" }} icon={
      <div className="flex justify-center items-center w-full h-full">
        <img src={experience.icon} alt={experience.company_name} className="w-3/5 h-3/5 object-contain" />
      </div>
    }>
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <p className="text-secondary text-lg font-semibold !m-0">{experience.company_name}</p>
    </div>
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => {
        return <li key={`experience-point-${index}`} className="text-white-100 text-sm pl-1 tracking-wider">
          {point}
        </li>
      })}
    </ul>

  </VerticalTimelineElement>
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>How it works</p>
        <h2 className={styles.sectionHeadText}>Timeline 2 Pro</h2>
      </motion.div>

      <div className="mt-8 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExpecienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "Experience")