import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useRef, useState } from "react";
import axios from "axios";
import EmailEditor from "react-email-editor";
import { Form, useNavigate } from "react-router-dom";
import { settemplatehtml, settemplatename } from "../features/counter/Template";
import "./reactemaileditor.css";
import { FormField, Input } from "semantic-ui-react";

const Reactemaileditor = () => {
  const TemplateName = useSelector((state) => state.Template.TemplateName);

  const Templatehtml = useSelector((state) => state.Template.Templatehtml);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newhtml, setnewhtml] = useState(Templatehtml);
  const email = useSelector((state) => state.User.email);
  // State to hold the HTML content

  const emailEditorRef = useRef(null);

  const exportHtml = async () => {
    await emailEditorRef.current.editor.exportHtml(
      (data) => {
        const { design, html } = data;
        //console.log(html);
        setnewhtml(html);
        //console.log(Templatehtml);
      },
      {
        cleanup: true,
      }
    );
    if (!newhtml) {
      alert("Please fill the template html");
    }
    if (!TemplateName) {
      alert("Please fill the template name");
    }
    console.log(newhtml);
    try {
      const response = await axios.post(
        "http://localhost:3000/usertemplates/newtemplate",
        {
          email,
          name: TemplateName,
          html: newhtml,
        }
      );

      if (response.status === 201) {
        navigate("/alltemplates");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    //   emailEditorRef.current.editor.loadDesign({ design: JSON.parse(content) });
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div className="email-editor">
      <div className="email-editor-header">
        <input
          type="text"
          placeholder="Enter Template Name"
          value={TemplateName}
          onChange={(e) => dispatch(settemplatename({ name: e.target.value }))}
        />
        <button onClick={exportHtml}>Save Template</button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
    </div>
  );
};
export default Reactemaileditor;
