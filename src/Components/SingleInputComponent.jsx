import React, { useState } from 'react';
import './SingleInputComponent.css'; // Import CSS file for styling
import { useSelector,useDispatch } from 'react-redux';
import { setid ,setname} from '../features/counter/roomslice';
import { useNavigate } from 'react-router-dom';
const SingleInputComponent = () => {
    const campaignname = useSelector((state)=>state.campaign.name);
    const Navigate=useNavigate();
    const dispatch=useDispatch();
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options)+' campaign';
  };
  const currentDate = formatDate(new Date());
  const [date, setDate] = useState(currentDate);
  const handlenext = () => {
    dispatch(setname({name: date}));
    Navigate('/campaign');
  };

  return (
    <div className="campaign-name-cointainer">
      <div className="bordered-component">
        <label htmlFor="">Name Your Campaign</label>
        <input
          type="text"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="custom-input"
          placeholder='Enter your Campaign name'
        />
      </div>
      <button onClick={handlenext}>Next</button>
    </div>
  );
};

export default SingleInputComponent;
