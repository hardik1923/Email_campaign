import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

const DateTimeConverter = ({ sendcapaign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [convertedStartTime, setConvertedStartTime] = useState('');
  const [convertedEndTime, setConvertedEndTime] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConvert = (sendNow = false) => {
    if (sendNow) {
      const now = new Date();
      const futureTime = new Date(now.getTime() + 60000); // Current time plus 1 minute
      setConvertedStartTime(futureTime.toISOString());
      setConvertedEndTime(futureTime.toISOString());
      setError('');
      sendcapaign(futureTime.toISOString(), futureTime.toISOString());
    } else if (startTime && endTime && new Date(startTime) <= new Date(endTime)) {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

      setConvertedStartTime(startDateTime.toISOString());
      setConvertedEndTime(endDateTime.toISOString());
      setError('');
      sendcapaign(startDateTime.toISOString(), endDateTime.toISOString());
    } else {
      setError('Start time should be less than or equal to end time.');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Send Campaign</Button>
      <Modal open={isOpen} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <TextField
            label="Start Time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: { paddingTop: '1.2rem' }, // Adjusting input value position
            }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: { paddingTop: '1.2rem' }, // Adjusting input value position
            }}
          />
          <Button onClick={() => handleConvert()} variant="contained" color="primary">Schedule campaign</Button>
          <Button onClick={() => handleConvert(true)} variant="contained" color="primary">Send Now</Button>
          
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            Converted Start Time: {convertedStartTime}
          </div>
          <div>
            Converted End Time: {convertedEndTime}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DateTimeConverter;
