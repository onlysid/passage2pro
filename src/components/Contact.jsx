import { useState, useRef, React, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailJs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dateLimits, setDateLimits] = useState({ min: null, max: null });
  const [discountPercent, setDiscountPercent] = useState(null);
  const [preferredCamp, setPreferredCamp] = useState('');
  
  const holidayCamps = [
    { id: 'markhall', name: 'Mark Hall', start: new Date("2025-07-28"), end: new Date("2025-08-01") },
    { id: 'leventhorpe', name: 'Leventhorpe', start: new Date("2025-08-11"), end: new Date("2025-08-15") },
  ];

  const today = new Date();
  const nextCamp = holidayCamps.find(camp => camp.start > today);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const updateCampPrice = (start, end, min, max, discountOverride = discountPercent) => {
    if (!start || !end || !min || !max) return;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const selectedDays = Math.round((end - start) / MS_PER_DAY) + 1;
    const fullDays = Math.round((max - min) / MS_PER_DAY) + 1;

    const pricePerDay = selectedDays === fullDays ? 20 : 25;
    let total = selectedDays * pricePerDay;

    if (discountOverride) {
      const discountedTotal = Math.ceil(total * (1 - discountOverride / 100));
      setPriceBox(`£${discountedTotal} (was £${total})`);
    } else {
      setPriceBox(`£${total} (£${pricePerDay}/day)`);
    }
  };

  const formatWithOrdinal = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' });

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month}`;
  };

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
        date_start: '',
        date_end: '',
      });

      const submissionData = {
        ...form,
        date_start: startDate?.toISOString() || '',
        date_end: endDate?.toISOString() || '',
      };

    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const [showDiscountCode, setShowDiscountCode] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [priceBox, setPriceBox] = useState(null);

  const handleDiscountCode = async () => {
    try {
      setDiscountLoading(true);

      // Check the database for a match
      const response = await axios.post('/api/checkDiscountCode', { code: discountCode });

      if (response.data.success) {
        const percent = response.data.discount;
        setDiscountPercent(percent);
        setAffiliateEmail(response.data.email);
        setDiscountMessage(`Congratulations! You have qualified for a ${percent}% discount. We will make note of this in your enquiry.`);

        // Recalculate the camp price with the discount
        updateCampPrice(startDate, endDate, dateLimits.min, dateLimits.max, percent);
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
        } else {
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

        {nextCamp && (
          <div id="dateInfo">
            <p className="text-xl font-extrabold text-logo mt-2">
              Next holiday camp: {nextCamp.name} ({formatWithOrdinal(nextCamp.start)} – {formatWithOrdinal(nextCamp.end)})
            </p>
          </div>
        )}

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
              <option value="finishing">2-1 Tandem Sessions</option>
            </select>
          </label>
          {form.classID === 'camps' && (
            <div className="flex flex-row gap-4">
              <div className="flex flex-col grow">
                <label className="text-white font-medium mb-2">Preferred Camp</label>
                <select
                  name="presetCamp"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setPreferredCamp(selected); // <- update state

                    if (selected === "markhall") {
                      const min = new Date("2025-07-28");
                      const max = new Date("2025-08-01");
                      setDateRange([min, max]);
                      setDateLimits({ min, max });
                      updateCampPrice(min, max, min, max);
                    } else if (selected === "leventhorpe") {
                      const min = new Date("2025-08-11");
                      const max = new Date("2025-08-15");
                      setDateRange([min, max]);
                      setDateLimits({ min, max });
                      updateCampPrice(min, max, min, max);
                    } else {
                      setDateRange([null, null]);
                      setDateLimits({ min: null, max: null });
                      setPriceBox(null);
                    }
                  }}
                  className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium w-full"
                >
                  <option value="">Choose a camp</option>
                  <option value="markhall">Mark Hall (28th July – 1st August)</option>
                  <option value="leventhorpe">Leventhorpe (11th August – 15th August)</option>
                </select>

              </div>

              {preferredCamp && (
                <div className="flex flex-col grow">
                  <label className="text-white font-medium mb-2">Choose days (optional)</label>
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                      const [newStart, newEnd] = update;
                      updateCampPrice(newStart, newEnd, dateLimits.min, dateLimits.max);
                    }}
                    isClearable={true}
                    placeholderText="Select a date range"
                    className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium w-full"
                    minDate={dateLimits.min}
                    maxDate={dateLimits.max}
                  />
                </div>
              )}

            </div>
          )}

          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Message</span>
            <textarea type="textarea" rows="3" name="message" value={form.message} onChange={handleChange} placeholder="eg. Would you like to request early pick up/drop off?" className="bg-[#ffea76] py-3 px-6 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
          </label>
          {priceBox && (
            <div id="pricingBox" className="-mt-2">
              <p className="text-xl font-extrabold mt-2">Price: {priceBox}</p>
            </div>
          )}
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