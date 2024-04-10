import React from 'react';
import { faker } from '@faker-js/faker';

const generateEmail = () => faker.internet.email();

const EmailCSVGenerator = () => {
  
  const emails = Array.from({ length: 3 }, generateEmail);

  // Function to convert email addresses to CSV format
  const convertToCSV = () => {
    const csvContent = emails.join('\n');
    return csvContent;
  };

  // Function to trigger download of CSV file
  const downloadCSV = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'email_addresses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default EmailCSVGenerator;
