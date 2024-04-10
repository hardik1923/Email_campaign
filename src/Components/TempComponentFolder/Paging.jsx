import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const CampaignList = () => {
  // Other state variables...
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage= 5;

  const filteredCampaigns = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns?.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="campaign-list-container">
      {/* Other JSX */}
      <ul className="campaign-list">
        {/* Render current campaigns */}
        {currentCampaigns.map((campaign) => (
          <li  className="campaign-item">
            {campaign}
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {filteredCampaigns && (
          Array.from({ length: Math.ceil(filteredCampaigns.length / campaignsPerPage) }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => paginate(page)} className={currentPage === page ? 'active' : ''}>
              {page}
            </button>
          ))
        )}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCampaigns.length / campaignsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignList;
