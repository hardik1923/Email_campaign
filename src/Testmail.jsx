/*import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const EmailInputForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmailInput(value);
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(value));
  };
  
  const handleSubmit = async () => {
    if (isValidEmail && emailInput.trim() !== '') {
      try {
        // Make a POST request to your backend API
        const response = await axios.post('http://your-backend-api.com/process-email', {
          email: emailInput.trim()
        });
        console.log(response.data); // Log the response from the backend
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Email Input Form</h2>
      <div>
        <input
          type="email"
          placeholder="Enter email address"
          value={emailInput}
          onChange={handleInputChange}
        />
        {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EmailInputForm;*/
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const EmailInputForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmailInput(value);
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(value));
  };
  
  const handleSubmit = async () => {
    if (isValidEmail && emailInput.trim() !== '') {
      setIsSending(true); // Set sending state to true while request is in progress
      try {
        // Make a POST request to your backend API
        const response = await axios.post('http://localhost:5000/process-email', {
          email: emailInput.trim()
        });
        console.log(response.data); // Log the response from the backend
        // Handle success case if needed
      } catch (error) {
        console.error('Error:', error);
        // Handle error case if needed
      } finally {
        setIsSending(false); // Set sending state back to false when request completes
      }
    }
  };

  return (
    <div>
      <h2>Email Input Form</h2>
      <div>
        <input
          type="email"
          placeholder="Enter email address"
          value={emailInput}
          onChange={handleInputChange}
        />
        {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
        <button onClick={handleSubmit} disabled={isSending}>
          {isSending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default EmailInputForm;

