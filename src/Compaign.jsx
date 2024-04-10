import React, { useEffect, useRef } from "react";
import "./compaign.css";
import { useState } from "react";
import Emailtemplate from "./Emailtemplate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setname,
  setsegmentId,
  setenableclone,
  setsenderemail,
} from "./features/counter/roomslice";
import { Form, Input, Select } from "semantic-ui-react";
import axios from "axios";

function Compaign() {
  const api_url = "http://localhost:3000";
  const userEmail = useSelector((state) => state.User.email);
  // = useSelector((state)=>state.campaign.enableedit);
  const enableedit = useSelector((state) => state.campaign.enableedit);
  const senderemailglobal = useSelector((state) => state.campaign.senderemail);
  const [newsenderemail, setnewsenderemail] = useState("");
  //console.log(senderemailglobal);
  const [segments, setsegments] = useState([]);
  const campaignname = useSelector((state) => state.campaign.name);
  const segmentId = useSelector((state) => state.campaign.segmentId);
  console.log("segmentid id ", segmentId);
  const [selectOptions, setselectOptions] = useState([]);
  //const [senderemail, setsenderemail] = useState("");
  const subjectfromstate = useSelector((state) => state.campaign.subject);
  const [subject, setsubject] = useState(subjectfromstate);
  const [Sendermailverificationstatuts, setSendermailverificationstatuts] =
    useState("not-send");
  const [isnewsenderemail, setisnewsenderemail] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const MAX_SUBJECT_LENGTH = 988;

  const [SenderEmails, setSenderEmails] = useState(
    [{ email: "example1@example.com", isVerified: true, status: "not-send" }] ||
      []
  );

  const senderemailoptions = SenderEmails?.map((email, index) => ({
    key: index,
    text: `${email.email} / ${email.isVerified ? "Verified" : "Not verified"}`,
    value: email.email,
    isverified: email.isVerified,
  }));

  const findSendermailverificationstatuts = SenderEmails?.find((email) => {
    return email.email === senderemailglobal;
  });
  if (findSendermailverificationstatuts)
    console.log("found email", findSendermailverificationstatuts);
  // setSendermailverificationstatuts(findSendermailverificationstatuts.status);

  const handleEmailverify = async () => {
    // send aws mail using api call
    const res = await axios.get(
      `http://localhost:3000/senderemails/verifymail/:${senderemailglobal}`
    );
    //console.log(res);
    if (res.status === 201) {
      alert("Email verification req send to email address");
      const data = await res.json();
      const updatedSenderEmails = SenderEmails.map((email) => {
        if (email.email === senderemailglobal) {
          return { ...email, isVerified: true }; // Mark the selected email as verified
        }
        return email;
      });
      setSenderEmails(updatedSenderEmails);
    }
  };

  useEffect(() => {
    const getallsegments = async () => {
      const retrievedEmail = localStorage.getItem("userEmail");
      await fetch(`${api_url}/segments/getsegments/${retrievedEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setsegments(data);
          setselectOptions(() =>
            data?.map((segment, index) => ({
              key: index,
              text: segment.name,
              value: segment.Id,
            }))
          );
        });
    };
    getallsegments();
  }, []);

  useEffect(() => {
    const getallsenderemails = async () => {
      await fetch(`${api_url}/senderemails/getemails/aktyagi18052002@gmail.com`)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data.list);
          setSenderEmails(data.list || []);
          // setselectOptions(()=>data?.map((segment,index) => ({
          //     key: index,
          //     text: segment.name,
          //     value: segment.Id
          //   })));});
        });
    };
    getallsenderemails();
  }, []);

  const updatesenderemails = async () => {
    try {
      const res = await fetch(`${api_url}/senderemails/updatelist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          list: [...SenderEmails, { email: newsenderemail, isVerified: false }],
        }),
      });
      if (res.status === 201) {
        const data = await res.json();
        console.log("updated list, data", data.list);
        setSenderEmails(data.list);
        return true;
      } else {
        const error = await res.json();
        console.log(error.message);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // function openFileInput() {
  //     fileInputRef.current.click();
  // }

  // function getfileinput(e){
  //     const allowedExtensions = ["csv"];
  //     setError("");
  //     if(e.target.files.length){
  //         const inputfile = e.target.files[0];
  //         const fileExtension = inputfile?.type.split("/")[1];
  //         if(!allowedExtensions.includes(fileExtension)){
  //             setError("file extension is not valid");
  //             return;
  //         }
  //         setmailinglist(inputfile);
  //     }
  //     handleParse();
  // }

  // const toggleShowAll = () => {
  //     setshowAll(!showAll);
  //   };

  //   const handleopen=()=>{

  //     if(open){
  //         setopen(false);
  //     }else{

  //         handleParse();
  //         setopen(true)
  //     }

  //   }

  const createnewsegment = async () => {
    navigate("/newsegment");
    //.then(response=>response.json()).then(data=>{console.log('data', data)});
  };
  const handleemailchange = (e, { value }) => {
    const selectedOption = senderemailoptions.find(
      (option) => option.value === value
    );

    if (!selectedOption.isverified) {
      alert("This address is not verified, please verify");
    }
    dispatch(setsenderemail({ senderemail: value }));
    // setsenderemail(value);
  };
  const handleSelectChange = (e, { value }) => {
    const selectedSegment = segments.find((segment) => segment.Id === value);
    dispatch(setsegmentId({ segmentId: selectedSegment.Id }));
  };

  const handlesubjectchange = (e, { value }) => {
    const newSubject = value;
    if (newSubject.length <= MAX_SUBJECT_LENGTH) {
      setsubject(newSubject);
    }
  };
  const handlecampaignnamechange = (e, { value }) => {
    //setDate(value);
    dispatch(setname({ name: value }));
  };

  const checkforvalidmail = (email) => {};

  return (
    <div className="compaign">
      {/* //     <h4 className='campaign-name'>Your Campaign Name: {campaignname}</h4> */}
      {/* <div className='segment-list'>
            {!opensegments&&<button className='Get-list' >Click Here to choose from your existing Segments </button>}
        </div> */}
      <Form className="new-campaign-form">
        <Form.Field
          control={Input}
          label="Enter campaign Name"
          placeholder="Enter camapign name"
          name="selectOption"
          value={campaignname}
          onChange={handlecampaignnamechange}
        />

        <Form.Group widths="equal" className="form-grp">
          <Form.Field
            control={Select}
            label="Select mailingList"
            options={selectOptions}
            placeholder="Select List"
            name="selectOption"
            value={segmentId}
            onChange={handleSelectChange}
          />

          <Form.Button label="create new" primary onClick={createnewsegment}>
            New MailingList
          </Form.Button>
        </Form.Group>

        {!isnewsenderemail && (
          <Form.Group widths="equal" className="form-grp">
            <Form.Field
              control={Select}
              label="Select Sender Email"
              options={senderemailoptions}
              placeholder="Select Email"
              name="selectOption"
              value={senderemailglobal}
              onChange={handleemailchange}
            />

            <Form.Button onClick={handleEmailverify}>Verify</Form.Button>
            <p>Verification {findSendermailverificationstatuts?.status}</p>
            <Form.Button
              onClick={() => {
                setisnewsenderemail(true);
                setsenderemail("");
              }}
            >
              Enter New Email
            </Form.Button>
          </Form.Group>
        )}

        {isnewsenderemail && (
          <Form.Group widths="equal" className="form-grp">
            <Form.Field
              control={Input}
              label="Enter Sender Email address"
              placeholder="Enter Sender Email"
              type="text"
              name="password"
              value={newsenderemail}
              onChange={(e) => {
                //setsenderemail(e.target.value);
                //dispatch(setsenderemail({ senderemail: e.target.value }));
                setnewsenderemail(e.target.value);
              }}
            />
            <Form.Button
              onClick={() => {
                setsenderemail("");
                setisnewsenderemail(false);
              }}
            >
              Cancel
            </Form.Button>

            <Form.Button
              onClick={() => {
                console.log(newsenderemail, "this is sender email");
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                const isValidEmail = emailRegex.test(newsenderemail);

                if (!isValidEmail) {
                  alert("Please Enter valid Email Address");
                  return;
                }

                const getupdate = updatesenderemails();

                // call to update list
                if (getupdate) {
                  alert("Sender Email Added");
                  // setSenderEmails([
                  //   ...SenderEmails,
                  //   {
                  //     email: newsenderemail,
                  //     isVerified: false,
                  //   },
                  // ]);
                } else {
                  alert("There was some error adding email, Please try again");
                  return;
                  // setSenderEmails([...SenderEmails,
                  // { email:senderemail,
                  //   isVerified:false,
                  // }
                }
                console.log("yha tak aa rhe hn");
                const selectedOption = SenderEmails?.filter(
                  (email) => email.email === newsenderemail
                );

                if (!selectedOption.isVerified) {
                  alert("This address is not verified, please verify");
                }
                setisnewsenderemail(false);
              }}
            >
              Save Email
            </Form.Button>
          </Form.Group>
        )}

        {subject.length > 0 && (
          <div className="character-limit">
            {subject.length}/{MAX_SUBJECT_LENGTH} characters
          </div>
        )}

        <Form.Field
          control={Input}
          label="Subject"
          placeholder="Enter Subject"
          type="text"
          name=""
          value={subject}
          onChange={handlesubjectchange}
        />
      </Form>
      <Emailtemplate senderemail={senderemailglobal} subject={subject} />
    </div>
  );
}

export default Compaign;
