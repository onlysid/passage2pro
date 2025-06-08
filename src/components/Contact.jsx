import { useState, useRef, React, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailJs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import axios from 'axios';
import { camps as holidayCamps, formatWithOrdinal } from '../constants';
import 'react-datepicker/dist/react-datepicker.css';

const Contact = () => {
  const formRef = useRef();
  const discountRef = useRef(null);
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
  const [selectedDays, setSelectedDays] = useState([]);

  const generateDateArray = (start, end) => {
    const arr = [];
    const dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const today = new Date();
  const nextCamp = holidayCamps.find(camp => camp.start > today);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const updateCampPrice = (selectedDates = selectedDays, min, max, discountOverride = discountRef.current) => {
    if (!selectedDates.length || !min || !max) {
      setPriceBox(null);
      return;
    }

    const fullDays = Math.round((max - min) / (1000 * 60 * 60 * 24)) + 1;
    const selectedCount = selectedDates.length;

    const pricePerDay = selectedCount === fullDays ? 20 : 25;
    let total = selectedCount * pricePerDay;

    if (discountOverride) {
      const discountedTotal = Math.ceil(total * (1 - discountOverride / 100));
      setPriceBox(`£${discountedTotal} (was £${total})`);
    } else {
      setPriceBox(`£${total} (£${pricePerDay}/day)`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailJs.send(
      'service_iy2qgy5',
      'template_kle8u8k',
      {
        from_name: form.name,
        to_name: 'Leo',
        from_email: form.email,
        to_email: 'sid@onlysid.com',
        message: form.message,
        player_name: form.pname,
        phone_number: form.tel,
        class: form.classID,
        age: form.age,
        school: form.school,
        team: form.team,
        discount: form.discount,
        camp: preferredCamp,
        selected_days: selectedDays.map(d => formatWithOrdinal(d)).join(', '),
        price_summary: priceBox,
        discount_percent: discountPercent?.toString() || '',
        affiliate_email: affiliateEmail || '',
      },
      'DOGeX_gtySU7Lggbv'
    ).then(() => {
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
      preferred_camp: preferredCamp,
      selected_days: selectedDays.map(d => d.toISOString()),
      price_summary: priceBox,
      discount_percent: discountPercent,
      affiliate_email: affiliateEmail,
    };

    // Call the function to send data with retry mechanism
    sendDataWithRetry(submissionData);

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
    const selectedCamp = holidayCamps.find(c => c.id === preferredCamp);

    if (selectedCamp?.priceOverride) {
      setDiscountMessage(`This camp is already discounted to £${selectedCamp.priceOverride}. No discount code needed.`);
      return;
    }

    try {
      setDiscountLoading(true);
      const response = await axios.post('/api/checkDiscountCode', { code: discountCode });

      if (response.data.success) {
        const percent = response.data.discount;
        setDiscountPercent(percent);
        discountRef.current = percent;
        setAffiliateEmail(response.data.email);
        setDiscountMessage(`Congratulations! You have qualified for a ${percent}% discount. We will make note of this in your enquiry.`);

        updateCampPrice(selectedDays, dateLimits.min, dateLimits.max, discountRef.current);

        setForm(prevForm => ({ ...prevForm, discount: discountCode }));
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
  useEffect(() => {
    if (form.classID !== "camps") {
      setPreferredCamp('');
      setSelectedDays([]);
      setDateRange([null, null]);
      setDateLimits({ min: null, max: null });
      setPriceBox(null);
    }
  }, [form.classID]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const classType = queryParams.get("class");
    const selectLink = document.querySelector('select[name=classID]');
    const firstCamp = holidayCamps.find(c => !c.disabled);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const shouldScrollToCamps = classType === "camps" || classType === "next-camp";
    const shouldAutoSelectCamp = classType === "next-camp";

    if (shouldScrollToCamps) {
      setTimeout(() => {
        document.getElementById('project-3')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      if (selectLink) {
        selectLink.value = 'camps';
        setForm(prevForm => ({ ...prevForm, classID: 'camps' }));
      }
    }

    if (shouldAutoSelectCamp && firstCamp) {
      setPreferredCamp(firstCamp.id);

      const { start, end, priceOverride, fullPrice, pricePerDay, fullWeekPricePerDay } = firstCamp;
      const dates = generateDateArray(start, end);
      setDateRange([start, end]);
      setSelectedDays(dates);
      setDateLimits({ min: start, max: end });

      const fullDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const perDay = dates.length === fullDays ? fullWeekPricePerDay : pricePerDay;
      const total = perDay * dates.length;

      if (priceOverride) {
        setPriceBox(`£${priceOverride} (was £${fullPrice})`);
      } else if (discountRef.current) {
        const discountedTotal = Math.ceil(total * (1 - discountRef.current / 100));
        setPriceBox(`£${discountedTotal} (was £${total})`);
      } else {
        setPriceBox(`£${total} (£${perDay}/day)`);
      }
    }

    const updateFormMeta = () => {
      const dateInfoEl = document.querySelector('#dateInfo');
      if (!dateInfoEl) return;

      if (selectLink?.value === "camps") {
        dateInfoEl.style.display = 'block';
      } else {
        dateInfoEl.style.display = 'none';
      }
    };

    if (selectLink) {
      selectLink.addEventListener('change', updateFormMeta);
      updateFormMeta();
    }

    return () => {
      if (selectLink) {
        selectLink.removeEventListener('change', updateFormMeta);
      }
    };
  }, []);

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden justify-center items-center">
      <motion.div variants={slideIn('left', "tween", 0.2, 1)} className="flex-1 bg-black-100 w-full p-4 xl:p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Send us a message</p>
        <h3 className={styles.sectionHeadText}>Enquire today.</h3>

        {form.classID === "camps" && preferredCamp && (
          <div id="dateInfo">
            {(() => {
              const camp = holidayCamps.find(c => c.id === preferredCamp);
              if (!camp) return null;

              if (camp.priceOverride) {
                return (
                  <p className="text-xl font-extrabold text-logo mt-2">
                    Special Price: £{camp.priceOverride} (was £{camp.fullPrice})
                  </p>
                );
              } else {
                return (
                  <p className="text-xl font-extrabold text-logo mt-2">
                    Price: £20/day (Full Week) OR £25/day (Selected Days)
                  </p>
                );
              }
            })()}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <label className="flex flex-col"><span className="text-white font-medium mb-2">Which class would you like to join?</span>
            <select value={form.classID} name="classID" onChange={handleChange} className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium">
              <option value="group">Small Group</option>
              <option value="individual">One to One</option>
              <option value="camps">Holiday Camps</option>
              <option value="finishing">2-1 Tandem Sessions</option>
            </select>
          </label>
          {form.classID === 'camps' && (
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex flex-col grow">
                <label className="text-white font-medium mb-2">Preferred Camp</label>
                <select
                  name="presetCamp"
                  value={preferredCamp} // <-- this ensures it's controlled
                  onChange={async (e) => {
                    const selected = e.target.value;
                    setPreferredCamp(selected);
                    const selectedCamp = holidayCamps.find(c => c.id === selected);
                    if (!selectedCamp) return;

                    const { start, end, priceOverride, fullPrice, pricePerDay, fullWeekPricePerDay } = selectedCamp;
                    const dates = generateDateArray(start, end);
                    setDateRange([start, end]);
                    setSelectedDays(dates);
                    setDateLimits({ min: start, max: end });

                    if (priceOverride) {
                      setPriceBox(`£${priceOverride} (was £${fullPrice})`);
                    } else if (discountRef.current) {
                      const fullDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
                      const perDay = dates.length === fullDays ? fullWeekPricePerDay : pricePerDay;
                      const total = perDay * dates.length;
                      const discountedTotal = Math.ceil(total * (1 - discountRef.current / 100));
                      setPriceBox(`£${discountedTotal} (was £${total})`);
                    } else {
                      const fullDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
                      const perDay = dates.length === fullDays ? fullWeekPricePerDay : pricePerDay;
                      const total = perDay * dates.length;
                      setPriceBox(`£${total} (£${perDay}/day)`);
                    }
                  }}
                  className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium w-full"
                >
                  <option value="">Choose a camp</option>
                  {holidayCamps.map(camp => (
                    <option key={camp.id} value={camp.id}>
                      {camp.name} ({formatWithOrdinal(camp.start)}{camp.start.getTime() !== camp.end.getTime() ? ` – ${formatWithOrdinal(camp.end)}` : ''})
                    </option>
                  ))}
                </select>


              </div>

              {(() => {
                const camp = holidayCamps.find(c => c.id === preferredCamp);
                return camp && !camp.priceOverride;
              })() && (
                <div className="flex flex-col items-center justify-center grow">
                  <label className="text-white font-medium mb-2">Select days to attend</label>
                  {dateLimits.min && dateLimits.max && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {generateDateArray(dateLimits.min, dateLimits.max).map(date => {
                        const iso = date.toISOString();
                        const label = formatWithOrdinal(date);
                        const isChecked = selectedDays.some(d => d.toISOString() === iso);

                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => {
                              let updated;
                              if (isChecked) {
                                updated = selectedDays.filter(d => d.toISOString() !== iso);
                              } else {
                                updated = [...selectedDays, date];
                              }

                              updated.sort((a, b) => a - b);

                              // Safeguard against empty array (could crash)
                              if (updated.length > 0) {
                                const newStart = updated[0];
                                const newEnd = updated[updated.length - 1];

                                setSelectedDays(updated);
                                setDateRange([newStart, newEnd]);
                                updateCampPrice(updated, dateLimits.min, dateLimits.max, discountRef.current);

                              } else {
                                // Clear state if no days selected
                                setSelectedDays([]);
                                setDateRange([null, null]);
                                setPriceBox(null);
                              }

                            }}
                            className={`transition-all px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer hover:scale-105
                              ${isChecked ? 'bg-green-400 text-black border-green-400' : 'bg-transparent text-green-200 border-red-400 hover:bg-green-200 hover:text-black'}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>


              )}

            </div>
          )}
          <hr />
          <h3 className={"!text-xl !uppercase " + styles.sectionHeadText + " font-bold text-center bg-white !text-dark rounded-xl px-4 py-2"}>Your information</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Name</label>
              <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="eg. John Doe" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="eg. danilo@juventus.com" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Your Phone Number</label>
              <input required type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="eg. +4412345678" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <hr />
          <h3 className={"!text-xl !uppercase " + styles.sectionHeadText + " font-bold text-center bg-white !text-dark rounded-xl px-4 py-2"}>Player's Information</h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's Name</label>
              <input required type="text" name="pname" value={form.pname} onChange={handleChange} placeholder="eg. Lionel Messi" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[8rem]"><label className="text-white font-medium mb-2">Player's Age</label>
              <input required type="number" name="age" min="4" max="90" value={form.age} placeholder="All ages welcome" onChange={handleChange} className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's School</label>
              <input type="text" name="school" value={form.school} onChange={handleChange} placeholder="(optional)" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
            <div className="flex flex-col grow basis-[20rem]"><label className="text-white font-medium mb-2">Player's Team</label>
              <input type="text" name="team" value={form.team} onChange={handleChange} placeholder="What team do you play for? (if any)" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
            </div>
          </div>
          <hr />

          <label className="flex flex-col"><span className="text-white font-medium mb-2">Your Message</span>
            <textarea type="textarea" rows="3" name="message" value={form.message} onChange={handleChange} placeholder="eg. Would you like to request early pick up/drop off?" className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium" />
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
                <input name="discount" placeholder='Enter Code' className="bg-[#ffea76] py-2.5 px-4 rounded-lg text-dark placeholder:text-dark/50 border-none font-medium max-w-full" type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
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