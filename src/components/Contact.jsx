import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailJs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import axios from 'axios';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    pname: '',
    age: '',
    email: '',
    tel: '',
    classID: 'group',
    message: '',
    discount: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(form.discount);
  
    emailJs.send('service_iy2qgy5', 'template_kle8u8k', { from_name: form.name, to_name: 'Leo', from_email: form.email, to_email: 'p2pfootballacademy@gmail.com', message: form.message, player_name: form.pname, phone_number: form.tel, class: form.classID, age: form.age, discount: form.discount }, 'DOGeX_gtySU7Lggbv').then(() => {
      setLoading(false);
      alert('Thank you. We will get back to you as soon as possible.');
  
      // Send data to the database
      axios.post('/api/data', form)
        .then(() => {
          console.log('Data sent to the database successfully');
        })
        .catch((error) => {
          console.error('Error sending data to the database', error);
        });
  
      setForm({
        name: '',
        pname: '',
        age: '',
        email: '',
        tel: '',
        classID: 'group',
        message: '',
        discount: '',
      });
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong.');
    });
  }

const [showDiscountCode, setShowDiscountCode] = useState(false);
const [discountCode, setDiscountCode] = useState('');
const [discountMessage, setDiscountMessage] = useState('');

const handleDiscountCode = async () => {
  // Check the database for a match
  const response = await axios.post('/api/checkDiscountCode', { code: discountCode });

  if (response.data.success) {
    setDiscountMessage("You're getting a 20% discount! We'll make note of this in your enquiry.");
    setForm(prevForm => ({ ...prevForm, discount: discountCode })); // Update the discount field in your form state with the actual discount code
  } else {
    setDiscountMessage('Invalid discount code.');
  }
};

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden justify-center items-center">
      <motion.div variants={slideIn('left', "tween", 0.2, 1)} className="flex-1 bg-black-100 w-full p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Send us a message</p>
        <h3 className={styles.sectionHeadText}>Enquire today.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Name</label>
              <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="What's your name?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's Name</label>
              <input required type="text" name="pname" value={form.pname} onChange={handleChange} placeholder="What's the player's name?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Player's Age</span>
            <input required type="number" name="age" min="4" max="90" value={form.age} onChange={handleChange} placeholder="What's the player's age?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="What's your email?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Number</label>
              <input required type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="What's your number?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Which class would you like to join?</span>
            <select value={form.class} name="classID" onChange={handleChange} className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium">
              <option value="group">Small Group</option>
              <option value="individual">One to One</option>
              <option value="camps">Holiday Camps</option>
              <option value="finishing">Finishing School</option>
            </select>
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Message</span>
            <textarea type="textarea" rows="3" name="message" value={form.message} onChange={handleChange} placeholder="What do you want to say?" className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <div className="flex flex-wrap gap-3 justify-start items-center">
            {!showDiscountCode && (
            <button className="bg-white max-w-max text-dark shadow-2xl shadow-gray px-6 py-3 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-primary hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl" type="button" onClick={() => setShowDiscountCode(true)}>Have a discount code?</button>
            )}
            {showDiscountCode && (
              <div className="gap-4 flex">
                <input name="discount" placeholder='Enter Code' className="bg-[#ffea76] py-4 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                <button className="bg-white max-w-max text-dark shadow-2xl shadow-gray px-6 py-3 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-green-800 hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl" type="button" onClick={handleDiscountCode}>Apply</button>
              </div>
            )}
            <p className="text-lg font-bold">{discountMessage}</p>
          </div>

          <button type="submit" className="bg-logo max-w-max text-dark shadow-2xl shadow-gray px-8 py-4 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-dark hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl hover:tracking-widest relative group hover:px-12">
            {loading ? 'Sending' : 'Send'}
          </button>
        </form>
      </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact, "contact");