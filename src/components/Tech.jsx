import { motion } from "framer-motion";
import { styles } from "../styles";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { BallCanvas } from "./canvas";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-20">
      {technologies.map((technology) => {
        return <div className="w-48 h-48" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      })}
    </div>
  )
}

export default SectionWrapper(Tech, "tech")