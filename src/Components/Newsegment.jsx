import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./newsegment.css";
import { useRef } from "react";
import {
  FormField,
  Button,
  Checkbox,
  Form,
  FormGroup,
} from "semantic-ui-react";
import Maillist from "./EmailList";
function Newsegment() {
  const [emails, setEmails] = useState([]);
  const [segmentname, setSegmentName] = useState("");
  const [addmanually, setaddmanually] = useState(false);
  const [inputemail, setinputemail] = useState("");
  const [Emailstodisplay, setEmailstodisplay] = useState([]);
  const [blacklist, setblacklist] = useState([]);
  const [blacklistemailcount, setblacklistemailcount] = useState(0);
  const inputRef = useRef("");
  const email = useSelector((state) => state.User.email);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsedEmails = parseCSV(text);
      setEmails(parsedEmails);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text) => {
    const rows = text.split("\n");
    const parsedEmails = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (row !== "") {
        const columns = row.split(",");
        const email = columns[0].trim();
        if (validateEmail(email)) {
          parsedEmails.push(`EMAIL,${email}`);
        }
      }
    }
    return parsedEmails;
  };

  useEffect(() => {
    const getblacklist = async () => {
      const res = await fetch(
        "http://localhost:3000/blacklists/getallblacklist"
      );

      if (res.status === 201) {
        const data = await res.json();
        setblacklist(data.blacklist);
      }
    };
    getblacklist();
  }, []);

  //const blacklist = ['aktyagi18052002@gmail.com', 'ankit12@gmail.com','yashmangla202@gmail.com'];

  useEffect(() => {
    console.log(emails);
    setblacklistemailcount(0);
    // Convert all emails to lowercase for case-insensitive comparison
    const lowerCaseEmails = emails.map((email) =>
      email.split(",")[1].toLowerCase()
    );

    // const modifiedemailswithstatus = lowerCaseEmails.map(email => {
    //     return {
    //       email:email,
    //       blacklisted:false || blacklist.includes(email),
    //     }

    // });
    const modifiedemailswithstatus = lowerCaseEmails.map((email) => {
      // Check if any document in the blacklist array has the same email as the current email
      const blacklisted = blacklist.some(
        (doc) => doc.email.toLowerCase() === email
      );
      if (blacklisted) {
        setblacklistemailcount(blacklistemailcount + 1);
      }
      return {
        email: email,
        blacklisted: blacklisted, // Set blacklisted to true if a match is found, false otherwise
      };
    });

    setEmailstodisplay(modifiedemailswithstatus);
  }, [emails]);

  const validateEmail = (email) => {
    // You can implement a proper email validation logic here
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleDownload = () => {
    const csvContent = `ChannelType,Address\n${emails.join("\n")}`;
    console.log(csvContent);
    setSegmentContent(csvContent);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
    setSegmentEnable(true);
  };

  const handleCreateSegment = async () => {
    try {
      if (!emails.length) {
        alert("Please upload your file");
        return;
      }
      if (!segmentname) {
        alert("Please enter your segment name");
        return;
      }
      const csvContent = `ChannelType,Address\n${emails.join("\n")}`;
      if (!csvContent) {
        alert("Please download your file");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/segments/newsegment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            name: segmentname,
            segmentcontent: csvContent,
          }), // Include JWT in authorization header
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        alert("Your segment has been created successfully");
        navigate("/campaign");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again");
    }
  };

  const handleImportClick = () => {
    inputRef.current.click();
  };

  const handleDeleteEmail = (index) => {
    console.log(index);
    const updatedEmails = [...emails]; // Create a copy of the emails array
    updatedEmails.splice(index, 1); // Remove the email at the specified index
    setEmails(updatedEmails); // Update the state with the modified array
  };
  const handleAddManually = () => {
    setaddmanually(!addmanually);
  };

  const handleAddEmailManually = () => {
    setaddmanually(true);
    if (!inputemail) {
      alert("Please enter email address");
    }
    const emailToAdd = inputemail;
    if (emailToAdd && validateEmail(emailToAdd)) {
      setEmails([...emails, `EMAIL,${emailToAdd}`]);
    } else {
      alert("Invalid email address");
    }
    setinputemail("");
  };
  const handlesamplecsvdownload = () => {
    // Create CSV content
    const csvContent =
      `Email,First Name,Last Name\n` +
      `email1@example.com,John,Doe\n` +
      `email2@example.com,Jane,Smith\n` +
      `email3@example.com,Alice,Johnson\n` +
      `email4@example.com,Bob,Williams\n` +
      `email5@example.com,Michael,Brown\n`;

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample.csv");

    // Append the anchor element to the body
    document.body.appendChild(link);

    // Trigger the click event on the anchor element
    link.click();

    // Remove the anchor element from the body
    document.body.removeChild(link);
  };

  return (
    <div className="Newsegment">
      <Form className="template-create-form">
        <h1>Create New List</h1>
        <FormField>
          <input
            className="form-row-template-input"
            type="text"
            placeholder="Enter Segment name"
            value={segmentname}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </FormField>
        <FormGroup unstackable widths={2}>
          <Button className="form-row-button" onClick={handleImportClick}>
            Import CSV File
          </Button>
          <p style={{ padding: "5px" }}>OR</p>
          <Button className="form-row-button" onClick={handleAddManually}>
            Add Manually
          </Button>
        </FormGroup>

        {addmanually && (
          <FormField>
            <input
              type="text"
              placeholder="Enter Email address"
              value={inputemail}
              onChange={(e) => setinputemail(e.target.value)}
            />
            <Button
              className="form-row-button"
              onClick={handleAddEmailManually}
            >
              Add
            </Button>
          </FormField>
        )}

        <FormGroup>
          <Button
            type="submit"
            disabled={emails.length === 0}
            onClick={handleCreateSegment}
          >
            Create List
          </Button>
          <Maillist emails={Emailstodisplay} deletemail={handleDeleteEmail} />
          {blacklistemailcount > 0 && (
            <p style={{ color: "red" }}>
              Your Mailing List contains {blacklistemailcount} Blacklisted{" "}
              {blacklistemailcount === 1 ? "Email" : "Emails"}
            </p>
          )}
        </FormGroup>
        <div className="instructions">
          Upload a csv file in a format such that each line contains a email
          address,first name and last name
          <Button onClick={handlesamplecsvdownload}>Downoad Sample csv </Button>
        </div>
      </Form>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default Newsegment;
