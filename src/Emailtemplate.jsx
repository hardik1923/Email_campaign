import React, { useState, useEffect } from "react";
import "./Emailtemplate.css";
import { useDispatch, useSelector } from "react-redux";
import Template from "./Template";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { Form, Input, Select } from "semantic-ui-react";
import CreateTemplate from "./Components/CreateTemplate";
import { settemplatedetails } from "./features/counter/Template";
import { setenableedit } from "./features/counter/roomslice";
import Templateeditmodel from "./Components/Templateeditmodel";

function Emailtemplate({ senderemail, subject }) {
  const base_url = "http://localhost:3000";
  const [SenderEmail, setSenderEmail] = useState("aktyagi@gmail.com"); // get user email from database
  const enableedit = useSelector((state) => state.campaign.enableedit);
  const enableclone = useSelector((state) => state.campaign.enableclone);
  const editcampstarttime = useSelector((state) => state.campaign.starttime);
  const [tempsenderEmail, settempsenderEmail] = useState("second");
  const [ChangeSDenderEmail, setChangeSDenderEmail] = useState(false);
  const [Subject, setSubject] = useState("");
  const [isnewtemplate, setisnewtemplate] = useState(false);

  const campaignname = useSelector((state) => state.campaign.name);

  const [body, setbody] = useState("");
  const [istemplatesaved, setistemplatesaved] = useState(false);
  const [templates, settemplates] = useState([]);
  const [templatename, settemplatename] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [convertedStartTime, setConvertedStartTime] = useState("");
  const [convertedEndTime, setConvertedEndTime] = useState("");
  const [error, setError] = useState("");
  const [selectOptions, setselectOptions] = useState([]);
  const [open, setOpen] = useState(false);
  console.log("this is start time", editcampstarttime);

  const enableeditorclone = enableclone || enableedit;

  const dispatch = useDispatch();
  const email = useSelector((state) => state.User.email);
  const Templatehtml = useSelector((state) => state.Template.Templatehtml);
  const TemplateName = useSelector((state) => state.Template.TemplateName);
  const segmentId = useSelector((state) => state.campaign.segmentId);

  const navigate = useNavigate();

  const getalltemplates = async () => {
    try {
      await fetch(
        `http://localhost:3000/usertemplates/getalltemplates/${email}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          console.log(data.templates);
          settemplates(data.templates);
          console.log(templates);
          setselectOptions(() =>
            data.templates?.map((template, index) => ({
              key: index,
              text: template.name,
              value: template.name,
            }))
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getalltemplates();
  }, []);

  const UpdateEmail = (e) => {
    if (ChangeSDenderEmail) {
      setSenderEmail(tempsenderEmail);
      setChangeSDenderEmail(false);
    } else {
      setChangeSDenderEmail(true);
    }
  };

  const sendcapaign = async (starttime, endtime) => {
    if (!campaignname || !Templatehtml || !segmentId) {
      alert("Please fill all the fields");
    }
    if (!campaignname) {
      alert("Please fill campaign name field");
    }
    if (!subject) {
      alert("Please fill subject field");
    }
    // if (!senderemail) {
    //   alert("Please fill sender email field");
    // }

    try {
      const res = await fetch("http://localhost:3000/campaigns/newcamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "aktyagi18052002@gmail.com",
          campaignname: campaignname,
          Appid: "eee3156e75484852ace0300b077c44e0",
          segmentid: segmentId,
          Templetename: TemplateName,
          starttime: starttime,
          endtime: endtime,
          html: Templatehtml,
          subject,
          senderemail: senderemail,
        }),
      });

      if (res.status === 201) {
        alert("campaign Created Successfully");
        navigate("/allcampaigns");
      } else {
        alert("there was an error creating campaign, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyEmail = async () => {
    await fetch(`http://localhost:3000/verifymail/${SenderEmail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Verification mail sent successfully");
        } else {
          alert("");
        }
      });
  };

  const handletemplatesave = async () => {
    if (!Subject || !body || !email || !templatename) {
      alert("Please Fill all the fields!");
      return;
    }
    setistemplatesaved(true);
    setisnewtemplate(false);
    setdisplaysend(true);
    setpreviewtemp(true);
  };

  const handleedittemplate = () => {
    setisnewtemplate(true);
    setistemplatesaved(false);
    setdisplaysend(false);
  };
  const handlechoosetemplate = () => {
    navigate("/choosetemplate");
  };
  const handlecreatenewtemplate = () => {
    navigate("/createtemplate");
  };

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const handleConvert = (sendNow = false) => {
    console.log(sendNow);
    if (sendNow) {
      const now = new Date();
      const futureTime = new Date(now.getTime() + 60000); // Current time plus 1 minute
      setConvertedStartTime(futureTime.toISOString());
      setConvertedEndTime(futureTime.toISOString());
      setError("");
      sendcapaign(futureTime.toISOString(), futureTime.toISOString());
    } else if (
      startTime &&
      endTime &&
      new Date(startTime) <= new Date(endTime)
    ) {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

      setConvertedStartTime(startDateTime.toISOString());
      setConvertedEndTime(endDateTime.toISOString());
      setError("");
      sendcapaign(startDateTime.toISOString(), endDateTime.toISOString());
    } else {
      setError("Start time should be less than or equal to end time.");
    }
  };
  const handltemplatechange = (e, { value }) => {
    const selectedTemplate = templates.find(
      (template) => template.name === value
    );
    dispatch(
      settemplatedetails({
        html: selectedTemplate.html,
        name: selectedTemplate.name,
      })
    );
  };

  useEffect(() => {
    console.log(templates);
  }, [templates]);

  const handleeditcampaign = () => {
    dispatch(setenableedit(false));
    alert("templated edited successfully");
    navigate("/allcampaigns");
  };
  const handleEditTemplate = (name, html) => {
    dispatch(
      settemplatedetails({
        name: name,
        html: html,
        istemplateedit: true,
      })
    );
    setOpen(true);
  };

  return (
    <div className="Emailtemplate">
      <Form className="create-campaign-form">
        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            label="Select template"
            options={selectOptions}
            name=""
            value={TemplateName}
            onChange={handltemplatechange}
          />
          <Button
            onClick={() => handleEditTemplate(TemplateName, Templatehtml)}
          >
            Edit
          </Button>
          <CreateTemplate className="new-template-btn" />{" "}
          {/*// create new template Button */}
        </Form.Group>
      </Form>

      {/* <div className="alltemplates">
            {templates.map((template,index)=>{
                return <div className='template' key={index}>
                    <span>{template.name}</span>
                    <button onClick={()=>{settemplatename(template.name);setdisplaysend(true)}}>Select</button>
                </div>
            })}

        </div> */}

      <br />

      {/* {!istemplatesaved&&<button onClick={()=>{setisnewtemplate(!isnewtemplate),setdisplaysend(false)}} disabled={istemplatesaved}> Create New Template </button>}
       {istemplatesaved && <button onClick={handleedittemplate}>Edit template</button>}
         */}

      {isnewtemplate && (
        <div className="Template">
          <input
            type="text"
            placeholder="Enter Template Name"
            value={templatename}
            onChange={(e) => {
              settemplatename(e.target.value);
            }}
          />
          <br />
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            placeholder="Enter Email Subject"
            value={Subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          ></textarea>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            placeholder="Enter Email Body "
            value={body}
            onChange={(e) => {
              setbody(e.target.value);
            }}
          ></textarea>
          <br />

          {Subject.trim() && body.trim() && templatename ? (
            <button onClick={handletemplatesave}>Save Template</button>
          ) : (
            <button disabled>Save Template (Disabled)</button>
          )}
        </div>
      )}

      {istemplatesaved && (
        <div className="emailsummary">
          <Template Header={Subject} Body={body} />
        </div>
      )}
      {/* 
        {displaysend ? (
            <DateTimeConverter sendcapaign={sendcapaign}/>
            ) : (
            
            <button disabled> Schedule Camapign (Disabled)</button>
            )} */}
      {
        <div className="campaignsendtoggle">
          Send Now
          <Icon
            name={isOn ? "toggle on" : "toggle off"}
            color={isOn ? "Blue" : "black"}
            size="big"
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
          />
          schedule
        </div>
      }

      {(isOn || enableedit) && (
        <div className="scheduleinputs">
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="start Time"
                type="datetime-local"
                name=""
                value={startTime || editcampstarttime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <Form.Field
                control={Input}
                label="End Time"
                type="datetime-local"
                name=""
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      )}
      {!enableeditorclone && (
        <button onClick={() => handleConvert(!isOn)}>
          {isOn ? "Schedule" : "Send "} Campaign{" "}
        </button>
      )}

      {enableeditorclone && (
        <button onClick={handleeditcampaign}>
          {" "}
          {enableclone ? "Clone" : "Edit"} Campaign{" "}
        </button>
      )}

      <p>{error}</p>
      <Templateeditmodel open={open} setOpen={setOpen} />
    </div>
  );
}

export default Emailtemplate;
