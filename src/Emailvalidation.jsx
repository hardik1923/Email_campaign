import React, { useState } from 'react';
import './Emailvalidation.css'
import ZeroBounceSDK from '@zerobounce/zero-bounce-sdk';

const Emailvalidation = ({emails}) => {
  console.log(emails);
  const [validem, setvalidem] = useState('');
  const [invalidem, setinvalid] = useState('')

  const zeroBounce = new ZeroBounceSDK();
  
  const API_KEY = '2ce65a85eb4f49f0b9e76da019a0e4df';
  
  zeroBounce.init(API_KEY);
  
  const handleValidationone = async () => { // for checking one mail
    
    try {
      const response = await fetch(`https://api.zerobounce.net/v2/validate?api_key=${API_KEY}&email=${emails.join(',')}`);
      const data = await response.json();
      
      //console.log(data);

      if(data?.status ==='valid'){
        setvalidem(data.address);
      }else{
        setinvalid(data.address);
      }

    } catch (error) {
      console.error('Error validating emails:', error);
    }

  };

  const handleValidationbulk = async () => {  // for checking bulk of mails
    try {
      const EmailBulk = emails?.map((email) => ({email}));
      
      // const EmailBulk=[{
      //   email_address: "aktyagi18052002@gmail.com",
      // },{
      //   email_address: "tyagi@gmail.com"
      // }]

      console.log(EmailBulk);

      const response = await zeroBounce.validateBatch(EmailBulk);
      
      console.log(response);
    } catch (error) {
      console.error(error);
    } 
  
  };
  return (
    <div>
      <h2> Email Validation </h2>
      <button className='validate-email-btn' onClick={handleValidationbulk}>Validate Emails</button>
      
      <div>
        <h3>Valid Emails:</h3>
        <ul>
          {validem}
        </ul>
      </div>
      {/* Hello here i will add my backend code okk*/}
      <div>
        <h3>Invalid Emails:</h3>
        <ul>
          {invalidem}
        </ul>
      </div>

    </div>
  );
};

export default Emailvalidation;
