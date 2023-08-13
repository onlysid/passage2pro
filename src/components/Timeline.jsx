import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import 'react-vertical-timeline-component/style.min.css';
import { styles } from "../styles";
import { timelineEvents } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const TimelineCard = ({ event }) => {
  return <VerticalTimelineElement
    contentStyle={{ background: '#2d2e32', color: '#fff' }} contentArrowStyle={{ borderRight: '7px solid #232631' }} date={event.date} iconStyle={{ background: "#2d2e32" }} icon={
      <div className="flex justify-center items-center w-full h-full">
        <img src={event.icon} alt={event.subtitle} className="w-3/5 h-3/5 object-contain" />
      </div>
    }>
    <div>
      <h3 className="text-white text-[24px] font-bold">{event.title}</h3>
      <p className="text-logo text-lg font-semibold !m-0">{event.subtitle}</p>
    </div>
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {event.points.map((point, index) => {
        return <li key={`event-point-${index}`} className="text-white-100 text-sm pl-1 tracking-wider">
          {point}
        </li>
      })}
    </ul>

  </VerticalTimelineElement>
}

const Timeline = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>How it works</p>
        <h2 className={styles.sectionHeadText}>P2P Course Timeline</h2>
      </motion.div>

      <div className="mt-8 flex flex-col">
        <VerticalTimeline>
          {timelineEvents.map((event, index) => (
            <TimelineCard key={index} event={event} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Timeline, "Timeline")