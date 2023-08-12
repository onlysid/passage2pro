import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailJs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => { }
  const handleSubmit = (e) => { }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden justify-center items-center">
      <motion.div variants={slideIn('left', "tween", 0.2, 1)} className="flex-1 bg-black-100 w-full p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Book Now</p>
        <h3 className={styles.sectionHeadText}>Enquire today.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="What's the player's name?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Player's Name</span>
            <input type="text" name="pname" value={form.name} onChange={handleChange} placeholder="What's your name?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="What's your email?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Number</span>
            <input type="tel" name="tel" value={form.email} onChange={handleChange} placeholder="What's your number?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Number</span>
            <input type="tel" name="tel" value={form.email} onChange={handleChange} placeholder="What's your number?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Number</span>
            <select name="cars" id="cars" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium">
              <option value="group">Small Group</option>
              <option value="individual">One to One</option>
              <option value="camps">Holiday Camps</option>
              <option value="finishing">Finishing School</option>
            </select>
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Message</span>
            <textarea type="textarea" rows="7" name="message" value={form.message} onChange={handleChange} placeholder="What do you want to say?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>

          <button type="submit" className="bg-logo max-w-max text-dark shadow-2xl shadow-gray px-8 py-4 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-primary hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl hover:tracking-widest relative group hover:px-12">
            {loading ? 'Sending' : 'Send'}
          </button>
        </form>
      </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact, "contact");