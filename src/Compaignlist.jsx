import React, { useState, useEffect } from "react";
import "./CampaignList.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setid,
  setname,
  setsegmentId,
  setenableedit,
  setstarttime,
  setenableclone,
  setsubject,
  setsenderemail,
} from "./features/counter/roomslice";

import { settemplatedetails } from "./features/counter/Template";

import axios from "axios";

const CampaignList = () => {
  const api_url = "http://localhost:3000";
  const campaignId = useSelector((state) => state.campaign.campaignId);
  const email = useSelector((state) => state.User.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Campaigns, setCampaigns] = useState([]);
  const [notverified, setnotverified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [isascending, setisascending] = useState(true);
  const [isnameascending, setisnameascending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 6;

  useEffect(() => {
    const checkverified = async () => {
      try {
        const response = await fetch(`${api_url}/api/v1/isverified/${email}`);
        console.log(response.status);
        if (response.status !== 201) {
          setnotverified(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkverified();
  }, []);

  useEffect(() => {
    const updatecampaigns = async () => {
      try {
        const response = await fetch(`${api_url}/campaigns/update/${email}`);
        console.log(response.status);
      } catch (error) {
        console.error(error);
      }
    };
    updatecampaigns();
  }, [email]);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`${api_url}/campaigns/getallcamp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      setCampaigns(data.campaigns);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    console.log(Campaigns);
  }, [Campaigns]);

  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    setSearchActive(!!value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchActive(false);
  };

  const filteredCampaigns = Campaigns?.filter((campaign) => {
    if (selectedStatus === "all") {
      return campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        campaign.status === selectedStatus &&
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  });

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns?.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCampaignDetails = async (id, name) => {
    console.log(id, name);
    dispatch(setid({ id: id }));
    dispatch(setname({ name: name }));
    console.log("id", campaignId);
    navigate("/campaign-details");
  };

  const sendverifymail = async () => {
    try {
      const response = await fetch(`${api_url}/api/v1/verifymail/${email}`);
      const data = await response.json();
      alert("Verification mail sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handlegetlist = async (seg_id) => {
    try {
      const response = await fetch(`${api_url}/segments/getsegment/${seg_id}`);
      const data = await response.json();
      if (response.status === 200) {
        const csvData = data.csv;
        const handleDownload = () => {
          const csvContent = csvData.split("\n").join("\r\n");

          const listlen = csvContent.split("\n").length - 1;

          setnummails(listlen);

          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });

          // Create a temporary URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create a temporary anchor element
          const link = document.createElement("a");
          link.href = url;
          seteditcampaign;
          link.setAttribute("download", "data.csv");

          // Append the anchor element to the body
          document.body.appendChild(link);

          // Trigger the click event on the anchor element
          link.click();

          // Remove the anchor element from the body
          document.body.removeChild(link);
        };
        handleDownload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handledateformat = (dateString) => {
    const pad = (number) => {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    };
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayName = days[date?.getDay()];
    const monthName = months[date?.getMonth()];
    const formattedDate = `${dayName}, ${pad(
      date.getDate()
    )} ${monthName} ${date.getFullYear()}, ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}`;
    return formattedDate;
  };

  const sortCampaignsBYdate = () => {
    if (isascending) {
      setCampaigns([
        ...Campaigns.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
      setisascending(false);
    } else {
      setCampaigns([
        ...Campaigns.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ),
      ]);
      setisascending(true);
    }
  };

  const sortCampaignsByname = () => {
    if (isnameascending) {
      setCampaigns([...Campaigns.sort((a, b) => a.name.localeCompare(b.name))]);
      setisnameascending(false);
    } else {
      setCampaigns([...Campaigns.sort((a, b) => b.name.localeCompare(a.name))]);
      setisnameascending(true);
    }
  };

  const handlesortByName = () => {
    sortCampaignsBYdate();
  };
  const handleosrtbyname = () => {
    sortCampaignsByname();
  };

  function convertISOToCustomFormat(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handlecampaignedit = (name, segmentid, template_name, start_time) => {
    console.log("this is seg id", segmentid);
    dispatch(setenableedit({ enableedit: true }));
    dispatch(setname({ name: name }));
    dispatch(setsegmentId({ segmentId: "a29fba508bcc422682fb67957ee86cd2" }));
    dispatch(settemplatedetails({ name: "new 15 mar template" }));
    dispatch(setstarttime({ starttime: convertISOToCustomFormat(start_time) }));
    navigate("/campaign");
  };

  const handlecamapignclone = async (
    name,
    segmentid,
    template_name,
    start_time,
    subject,
    senderemail
  ) => {
    console.log("this is segmnt is for coning", segmentid);
    dispatch(setname({ name: `${name} clone` }));
    dispatch(setsegmentId({ segmentId: segmentid }));
    dispatch(
      settemplatedetails({
        name: "new 15 mar template",
        html: "<div>HELLO</div>",
      })
    );
    dispatch(setstarttime({ starttime: convertISOToCustomFormat(start_time) }));
    dispatch(setenableclone({ enableclone: true }));
    dispatch(setsubject({ subject: subject }));
    dispatch(setsenderemail({ senderemail: senderemail }));
    navigate("/campaign");
  };

  const handleDelete = async (id) => {
    try {
      // Make an API call to delete the campaign
      const response = await axios.delete(
        `http://localhost:3000/campaigns/deletecampaign/${id}`
      );
      // Assuming successful deletion, update the campaigns state
      if (response.status === 200) {
        alert("campaign deleted successfully");
      }
      setCampaigns(Campaigns.filter((campaign) => campaign.Id !== id));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="campaign-list-container">
      {!notverified ? (
        <>
          <div className="campaign-header">
            <h1>Your Campaigns</h1>
            <p>
              <button
                onClick={(e) => {
                  navigate("/campaign");
                }}
              >
                + NEW
              </button>
              {/* <Link to="/campaign" className="Create-new-camp">
                Create new Campaign
              </Link> */}
            </p>
          </div>
          <div className="filter-container">
            <label htmlFor="filter-select" className="campaign-filter">
              Filter by Status:
            </label>
            <select
              id="filter-select"
              value={selectedStatus}
              onChange={handleFilterChange}
            >
              <option value="all">ALL</option>
              <option value="SCHEDULED">UPCOMING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="RUNNING">RUNNING</option>
              <option value="FAILED">FAILED</option>
            </select>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search campaign"
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchActive && (
                <button className="clear-search" onClick={handleClearSearch}>
                  <span>&times;</span>
                </button>
              )}
            </div>
          </div>

          <ul className="campaign-list">
            <li
              key="1"
              className="campaign-item"
              style={{ color: "black", fontSize: "20px" }}
            >
              <div className="campaign-details">
                <span className="campaign-serial-no">Sn.</span>
                <span className="campaign-name" onClick={handleosrtbyname}>
                  Name
                </span>
                <span className="campaign-status">Status</span>
                <span
                  className="campaign-timestamps"
                  onClick={handlesortByName}
                >
                  Timestamps
                </span>
                <span className="campaign-edit">Edit</span>
                <span className="campaign-mail-list">Lists</span>

                <span className="campaign-clone">clone</span>
                <span className="campaign-delete">preview</span>
              </div>
            </li>

            {currentCampaigns?.map((campaign, index) => (
              <li key={campaign.Id} className="campaign-item">
                <div className="campaign-details">
                  <span className="campaign-serial-no">
                    {(currentPage - 1) * campaignsPerPage + index + 1}
                  </span>
                  <span className="campaign-name">{campaign.name}</span>
                  <span className="campaign-status">{campaign.status}</span>
                  <span className="campaign-timestamps">
                    {handledateformat(campaign.created_at)}
                  </span>

                  {campaign.status === "SCHEDULED" ? (
                    <span
                      className="campaign-edit"
                      onClick={() => handlecampaignedit()}
                    >
                      Edit
                    </span>
                  ) : (
                    <span
                      className="campaign-edit"
                      onClick={() =>
                        handlecampaignedit(
                          campaign.name,
                          campaign.aws_seg_id,
                          campaign.template_name,
                          campaign.start_date
                        )
                      }
                    >
                      Edit
                    </span>
                  )}
                  <span
                    className="campaign-mail-list"
                    onClick={() => handlegetlist(campaign.segment_id)}
                  >
                    List
                  </span>
                  <span
                    className="campaign-clone"
                    onClick={() =>
                      handlecamapignclone(
                        campaign.name,
                        campaign.aws_seg_id,
                        campaign.template_name,
                        campaign.start_date,
                        campaign.subject,
                        campaign.senderemail
                      )
                    }
                  >
                    Clone
                  </span>
                  <span
                    className="campaign-delete"
                    onClick={() => handleDelete(campaign.Id)}
                  >
                    Delete
                  </span>
                </div>
                <button
                  className="view-analytics-button"
                  style={{
                    backgroundColor:
                      campaign.status === "SCHEDULED"
                        ? "gray"
                        : "rgb(238, 85, 102)",
                  }}
                  disabled={campaign.status === "SCHEDULED"}
                  onClick={() => getCampaignDetails(campaign.Id, campaign.name)}
                >
                  View Analytics
                </button>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {filteredCampaigns &&
              Array.from(
                {
                  length: Math.ceil(
                    filteredCampaigns.length / campaignsPerPage
                  ),
                },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={currentPage === page ? "active" : ""}
                >
                  {page}
                </button>
              ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredCampaigns.length / campaignsPerPage)
              }
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>
          Please verify your mail first{" "}
          <button onClick={sendverifymail}>send verify mail</button>
        </p>
      )}
    </div>
  );
};

export default CampaignList;
