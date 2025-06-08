import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Login';
import Cookies from 'js-cookie';
import axios from 'axios';
import emailJs from '@emailjs/browser';

const AdminPage = () => {
  const { password } = useContext(AuthContext);
  const isLoggedIn = Cookies.get('adminLoggedIn');

  // Define searchTerm and setSearchTerm using the useState hook
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiries, setEnquiries] = useState([]);

  // Define handleSearch function
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/enquiries?search=${searchTerm}`);
      if (Array.isArray(response.data)) {
        setEnquiries(response.data);
      } else {
        console.error('Unexpected API response:', response.data);
        setEnquiries([]);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    }
  };

  function formatSelectedDays(selectedDays) {
    if (!selectedDays) return '-';
    return selectedDays
      .split(',')
      .map(date => {
        const d = new Date(date.trim());
        return d.toLocaleDateString('en-GB', { weekday: 'short' });
      })
      .join(',');
  }


  useEffect(() => {
    axios.get('/api/enquiries')
      .then(response => {
        if (Array.isArray(response.data)) {
          setEnquiries(response.data);
        } else {
          console.error('Unexpected API response:', response.data);
          setEnquiries([]);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // If the user is not authenticated, redirect to the login page
  if (password !== import.meta.env.VITE_PASSWORD && !isLoggedIn) { // replace with your actual hardcoded password
    return <Navigate to="/login" />;
  }
  
  Cookies.set('adminLoggedIn', 'true', { expires: 7 }); // The cookie will expire after 7 days

  function mapClassIdToName(classId) {
    switch(classId) {
      case 1:
        return "Small Group";
      case 2:
        return "One to One";
      case 3:
        return "Holiday Camps";
      case 4:
        return "Finishing School";
      default:
        return "Undefined";
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get('/api/enquiries');
      // Refresh the page
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleConfirmPayment(id) {
    try {
      // Make a PUT request to the enquiries endpoint
      const response = await axios.put(`/api/updateEnquiry`, {
        id: id,
        confirmed: 1,
      });

      // Get the player's name
      const form = enquiries.find(enquiry => enquiry.id === id);
      const affiliateEmail = form.affiliate_email;
      const playerName = form.player_name;

      // Get the affiliate's name
      const affiliateName = form.affiliate_name;
      const discount = form.discount;

      if (!affiliateEmail) {
        console.error('No affiliate email found');
      } else {
        emailJs.send('service_iy2qgy5', 'template_vdo3kcg', { from_name: 'P2P', to_name: affiliateName, from_email: 'p2pfootballacademy@gmail.com', to_email: affiliateEmail, player_name: playerName, discount_amount: discount }, 'DOGeX_gtySU7Lggbv').then(() => {
          console.log('Email sent to the affiliate successfully');
        }, (error) => {
          console.log('Error sending email to the affiliate', error);
        });
      }
  
      // If the request was successful, refresh the data
      fetchData();
    } catch (error) {
      // If the request failed, log the error
      console.error('Error confirming payment:', error);
    }
  }
  
  async function handleRetract(id) {
    try {
      // Make a PUT request to the enquiries endpoint
      const response = await axios.put(`/api/updateEnquiry`, {
        id: id,
        confirmed: 0,
      });
  
      // If the request was successful, refresh the data
      // This is a placeholder and should be replaced with your actual data fetching logic
      fetchData();
    } catch (error) {
      // If the request failed, log the error
      console.error('Error retracting payment:', error);
    }
  }

  // Separate confirmed and unconfirmed enquiries
  const confirmedEnquiries = enquiries.filter(enquiry => enquiry.confirmed === 1);
  const unconfirmedEnquiries = enquiries.filter(enquiry => enquiry.confirmed === 0);

  // If the user is authenticated, render the admin page
  return (
    <div className="p-8 min-h-screen overflow-hidden flex justify-center">
      <div className="">

        <div className="flex gap-6 flex-wrap justify-center items-center">

          <h1 className="text-3xl font-bold">P2P Enquiries</h1>

          {/* Button to log out */}
          <button 
            onClick={() => {
              Cookies.remove('adminLoggedIn');
              window.location.reload(); // Refresh the page
            }}
            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log out
          </button>
        </div>

        {/* Search box */}
        <div className="flex justify-center mt-4">
          <div className="flex gap-4">
            <input 
              className="w-full rounded p-2" 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button 
              className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4"
              onClick={handleSearch}
            >
              <p className="font-semibold text-xs">Search</p>
            </button>
          </div>
        </div>

        <div className="mt-6"></div>
        <hr />
        {/* Display the unconfirmed enquiries */}
        <div className="my-2 overflow-x-auto max-w-[40rem] xl:max-w-[80rem] sm:-mx-6 lg:-mx-8 hidden md:block">
          <h2 className="text-center font-bold text-xl my-4">Payment Unconfirmed ({unconfirmedEnquiries.length})</h2>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Player Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Age</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Class</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Team</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Affiliate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Camp</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Selected Days</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {unconfirmedEnquiries.length > 0 ? (
                    unconfirmedEnquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.player_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200"><a href={`mailto:${enquiry.email}`} className="text-base text-purple-400 hover:text-green-500 transition-all">{enquiry.email}</a></td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{mapClassIdToName(enquiry.class)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.team ?? '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200"><a href={`mailto:${enquiry.affiliate_email}`} className="text-base text-purple-400 hover:text-green-500 transition-all">{(enquiry.affiliate) ? enquiry.affiliate_name + " (" + enquiry.discount + "%)" : ""}</a></td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.camp_id || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{formatSelectedDays(enquiry.selected_days)}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {enquiry.confirmed == 0 ? (
                            <button onClick={() => handleConfirmPayment(enquiry.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm Payment</button>
                          ) : (
                            <button onClick={() => handleRetract(enquiry.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Retract</button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center text-gray-200 py-4">No unconfirmed enquiries</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="my-2 sm:flex sm:flex-wrap overflow-x-auto sm:-mx-6 lg:-mx-8 md:hidden">
          <h2 className="text-center font-bold text-xl my-4 w-full">Payment Unconfirmed ({unconfirmedEnquiries.length})</h2>
          {unconfirmedEnquiries.length > 0 ? (
            unconfirmedEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <p className="text-gray-200 font-bold text-lg mb-2">{enquiry.player_name}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.name}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.age}</p>
                    <p className="text-gray-200 text-sm mb-2"><a href={`mailto:${enquiry.email}`} className="text-purple-400 hover:text-green-500 transition-all">{enquiry.email}</a></p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.phone}</p>
                    <p className="text-gray-200 text-sm mb-2">{mapClassIdToName(enquiry.class)}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.team ?? '-'}</p>
                    <p className="text-gray-200 text-sm mb-2"><a href={`mailto:${enquiry.affiliate_email}`} className="text-purple-400 hover:text-green-500 transition-all">{(enquiry.affiliate) ? enquiry.affiliate_name + " (" + enquiry.discount + "%)" : ""}</a></p>
                  </div>
                  <div className="px-6 py-4">
                    {enquiry.confirmed === 0 ? (
                      <button onClick={() => handleConfirmPayment(enquiry.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm Payment</button>
                    ) : (
                      <button onClick={() => handleRetract(enquiry.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Retract</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full">
              <p className="text-center text-gray-200 py-4">No unconfirmed enquiries</p>
            </div>
          )}
        </div>


        <div className="mt-6"></div>
        <hr />
        {/* Display the confirmed enquiries */}
        <div className="my-2 overflow-x-auto max-w-[40rem] xl:max-w-[80rem] sm:-mx-6 lg:-mx-8 hidden md:block">
          <h2 className="text-center font-bold text-xl my-4">Payment Confirmed ({confirmedEnquiries.length})</h2>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Player Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Age</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Class</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Team</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Affiliate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Camp</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Selected Days</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {confirmedEnquiries.length > 0 ? (
                    confirmedEnquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.player_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200"><a href={`mailto:${enquiry.email}`} className="text-base text-purple-400 hover:text-green-500 transition-all">{enquiry.email}</a></td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{mapClassIdToName(enquiry.class)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.team ?? '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200"><a href={`mailto:${enquiry.affiliate_email}`} className="text-base text-purple-400 hover:text-green-500 transition-all">{(enquiry.affiliate) ? enquiry.affiliate_name + " (" + enquiry.discount + "%)" : ""}</a></td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{enquiry.camp_id || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-200">{formatSelectedDays(enquiry.selected_days)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {enquiry.confirmed == 0 ? (
                            <button onClick={() => handleConfirmPayment(enquiry.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm Payment</button>
                          ) : (
                            <button onClick={() => handleRetract(enquiry.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Retract</button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center text-gray-200 py-4">No confirmed enquiries</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="my-2 sm:flex sm:flex-wrap overflow-x-auto sm:-mx-6 lg:-mx-8 md:hidden">
          <h2 className="text-center font-bold text-xl my-4 w-full">Payment Confirmed ({confirmedEnquiries.length})</h2>
          {confirmedEnquiries.length > 0 ? (
            confirmedEnquiries.map((enquiry) => (
              <div key={enquiry.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <p className="text-gray-200 font-bold text-lg mb-2">{enquiry.player_name}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.name}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.age}</p>
                    <p className="text-gray-200 text-sm mb-2"><a href={`mailto:${enquiry.email}`} className="text-purple-400 hover:text-green-500 transition-all">{enquiry.email}</a></p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.phone}</p>
                    <p className="text-gray-200 text-sm mb-2">{mapClassIdToName(enquiry.class)}</p>
                    <p className="text-gray-200 text-sm mb-2">{enquiry.team ?? '-'}</p>
                    <p className="text-gray-200 text-sm mb-2"><a href={`mailto:${enquiry.affiliate_email}`} className="text-purple-400 hover:text-green-500 transition-all">{(enquiry.affiliate) ? enquiry.affiliate_name + " (" + enquiry.discount + "%)" : ""}</a></p>
                  </div>
                  <div className="px-6 py-4">
                    {enquiry.confirmed === 0 ? (
                      <button onClick={() => handleConfirmPayment(enquiry.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Confirm Payment</button>
                    ) : (
                      <button onClick={() => handleRetract(enquiry.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Retract</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full">
              <p className="text-center text-gray-200 py-4">No confirmed enquiries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;