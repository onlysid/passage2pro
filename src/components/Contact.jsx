import { useState, useRef, React, useEffect } from 'react';
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
    school: '',
    team: '',
    email: '',
    tel: '',
    classID: '',
    message: '',
    discount: '',
  });

  // Define affiliateEmail and setAffiliateEmail using the useState hook
  const [affiliateEmail, setAffiliateEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discountLoading, setDiscountLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailJs.send('service_iy2qgy5', 'template_kle8u8k', { from_name: form.name, to_name: 'Leo', from_email: form.email, to_email: 'sid@onlysid.com', message: form.message, player_name: form.pname, phone_number: form.tel, class: form.classID, age: form.age, school: form.school, team: form.team, discount: form.discount }, 'DOGeX_gtySU7Lggbv').then(() => {
      setLoading(false);
      alert('Thank you. We will get back to you as soon as possible.');

    // Define a function to send data to the database with retry mechanism
    function sendDataWithRetry(form, maxRetries = 3, delayBetweenRetries = 1000, currentRetry = 0) {
      axios.post('/api/data', form)
        .then(() => {
          console.log('Data sent to the database successfully');
        })
        .catch((error) => {
          console.error('Error sending data to the database', error);
          if (currentRetry < maxRetries) {
            console.log(`Retrying... Attempt ${currentRetry + 1}`);
            setTimeout(() => {
              sendDataWithRetry(form, maxRetries, delayBetweenRetries, currentRetry + 1);
            }, delayBetweenRetries);
          } else {
            console.error('Max retries reached. Could not send data to the database.');
          }
        });
    }

    // Call the function to send data with retry mechanism
    sendDataWithRetry(form);

      setForm({
        name: '',
        pname: '',
        age: '',
        school: '',
        team: '',
        email: '',
        tel: '',
        classID: '',
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
  const originalPrice = 99.99;
  const [priceBox, setPriceBox] = useState(originalPrice);

  const handleDiscountCode = async () => {
    try {
      setDiscountLoading(true);

      // Check the database for a match
      const response = await axios.post('/api/checkDiscountCode', { code: discountCode });

      if (response.data.success) {
        // Get the affilaites email address
        setAffiliateEmail(response.data.email);
        setDiscountMessage(`Congratulations! You have qualified for a ${response.data.discount}% discount. We will make note of this in your enquiry.`);
        const discountPrice = Math.ceil(originalPrice * 0.01 * (100 - response.data.discount));
        setPriceBox(`${discountPrice}! (Was £${originalPrice})`);
        setForm(prevForm => ({ ...prevForm, discount: discountCode })); // Update the discount field in your form state with the actual discount code
      } else {
        setDiscountMessage('Invalid discount code.');
      }
    } catch (error) {
      console.error('Error while handling discount code:', error);
      setDiscountMessage('An error occurred while processing the discount code.');
    } finally {
      setDiscountLoading(false);
    }
  };

  useEffect(
    () => {
      // We specifically care about whether a link has been opened for the holiday camps campaign
      const queryParams = new URLSearchParams(window.location.search);
      let classType = queryParams.get("class");
      const campsLink = classType == "camps";

      // If scroll restoration is happening, turn it off
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // If we have selected holiday camps, go to the form and pre-select a few things
      const selectLink = document.querySelector('select[name=classID]');
      if(campsLink) {
        setTimeout(() => {
          document.getElementById('project-3').scrollIntoView({ behavior: 'smooth' });
        }, 500);
        selectLink.value = 'camps';
        setForm(prevForm => ({ ...prevForm, classID: 'camps' })); // Update the discount field in your form state with the actual discount code
      }

      // When the select link value is camps, we need to add some pricing information
      selectLink.addEventListener('change', () => {
        updateFormMeta(selectLink);
      });

      function updateFormMeta() {
        // If the selectLink's current value is not the holiday camps, don't show anything. Otherwise, show pricing
        if(selectLink.value === "camps") {
          document.querySelector('#dateInfo').style.display = 'block';
          document.querySelector('#pricingBox').style.display = 'block';
        } else {
          document.querySelector('#pricingBox').style.display = 'none';
          document.querySelector('#dateInfo').style.display = 'none';
        }
      }

      updateFormMeta();
    }, []
  )



  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden justify-center items-center">
      <motion.div variants={slideIn('left', "tween", 0.2, 1)} className="flex-1 bg-black-100 w-full p-4 xl:p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Send us a message</p>
        <h3 className={styles.sectionHeadText}>Enquire today.</h3>

        <div id="dateInfo">
          <p className="text-xl font-extrabold text-logo mt-2">Next holiday camp: August 27th-30th</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <hr />
          <h3 className={"!text-2xl !uppercase " + styles.sectionHeadText + " font-bold text-center bg-white !text-dark rounded-xl px-4 py-2"}>Your information</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Name</label>
              <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="eg. John Doe" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="eg. danilo@juventus.com" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Phone Number</label>
              <input required type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="eg. +4412345678" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <hr />
          <h3 className={"!text-2xl !uppercase " + styles.sectionHeadText + " font-bold text-center bg-white !text-dark rounded-xl px-4 py-2"}>Player's Information</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's Name</label>
              <input required type="text" name="pname" value={form.pname} onChange={handleChange} placeholder="eg. Lionel Messi" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[8rem]"><label className="text-white font-medium mb-2">Player's Age</label>
              <input required type="number" name="age" min="4" max="90" value={form.age} placeholder="All ages welcome" onChange={handleChange} className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's School</label>
              <input type="text" name="school" value={form.school} onChange={handleChange} placeholder="(optional)" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's Team</label>
              <input type="text" name="team" value={form.team} onChange={handleChange} placeholder="What team do you play for? (if any)" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <hr />
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Which class would you like to join?</span>
            <select value={form.classID} name="classID" onChange={handleChange} className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium">
              <option value="group">Small Group</option>
              <option value="individual">One to One</option>
              <option value="camps">Holiday Camps</option>
              <option value="finishing">Finishing School</option>
            </select>
          </label>
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Message</span>
            <textarea type="textarea" rows="3" name="message" value={form.message} onChange={handleChange} placeholder="eg. Would you like to request any specific dates/times?" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          <div id="pricingBox" className="-mt-2">
            <p className="text-xl font-extrabold mt-2">Price: £{priceBox}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-start items-center">
            {!showDiscountCode && (
            <button className="bg-white max-w-max text-dark shadow-2xl shadow-gray px-6 py-3 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500 hover:shadow-white hover:bg-primary hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl" type="button" onClick={() => setShowDiscountCode(true)}>Have a discount code?</button>
            )}
            {showDiscountCode && (
              <div className="gap-4 flex flex-wrap">
                <input name="discount" placeholder='Enter Code' className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium max-w-full" type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                <button
                  className={`bg-white max-w-max text-dark shadow-2xl shadow-gray px-6 py-3 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500
                              ${discountLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-white hover:bg-green-800 hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl'}`}
                  type="button"
                  onClick={handleDiscountCode}
                  disabled={discountLoading}
                >
                  {discountLoading ? 'Applying...' : 'Apply'}
                </button>
              </div>
            )}
            <p className="text-lg font-bold">{discountMessage}</p>
          </div>

          <button
            type="submit"
            className={`bg-logo max-w-max text-dark shadow-2xl shadow-gray px-8 py-3 rounded-bl-xl rounded-tr-3xl uppercase font-bold transition-all duration-500
                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-white hover:bg-dark hover:text-white hover:rounded-tr-none hover:rounded-bl-none hover:rounded-tl-xl hover:rounded-br-xl hover:tracking-widest hover:px-12'}`}
            disabled={loading}
          >
            {loading ? 'Sending' : 'Send'}
          </button>

        </form>
      </motion.div>

    </div>
  )
}

export default SectionWrapper(Contact, "contact");