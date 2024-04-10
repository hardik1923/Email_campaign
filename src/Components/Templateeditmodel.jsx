import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming an API endpoint exists
import { useSelector, useDispatch } from "react-redux";
import {
  ModalContent,
  ModalActions,
  Header,
  Icon,
  Modal,
  FormField,
  Button,
  Form,
  Grid,
  Segment,
} from "semantic-ui-react";
import { Select } from "semantic-ui-react";
import "./CreateTemplate.css";
import parse from "html-react-parser";
import { settemplatedetails } from "../features/counter/Template";
import { useNavigate } from "react-router-dom";

const EditTemplateModel = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.User.email);
  const TemplateName = useSelector((state) => state.Template.TemplateName);
  const Templatehtml = useSelector((state) => state.Template.Templatehtml);
  const istemplateedit = useSelector((state) => state.Template.istemplateedit);
  const [name, setName] = useState("");
  const [html, setHtml] = useState(Templatehtml);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  //const [open, setOpen] = useState(false);
  const [layouts, setlayouts] = useState([]);

  useEffect(() => {
    const getalllayouts = async () => {
      const res = await fetch("http://localhost:3000/layouts/getalllayouts");
      if (res.status === 201) {
        const data = await res.json();
        setlayouts(data.layouts);
      }
    };
    getalllayouts();
  }, []);

  useEffect(() => {
    setHtml(Templatehtml);
  }, [Templatehtml]);

  useEffect(() => {
    setName(TemplateName);
  }, [TemplateName]);

  const layoutsoptions = layouts.map((layout, index) => ({
    key: index,
    text: layout.name,
    value: layout.html,
  })) || [
    {
      key: "name",
      text: "ankit",
      value: "ankit",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !html) return alert("Please fill all the fields");
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/usertemplates/updatetemplate",
        {
          email,
          name,
          html,
        }
      );

      if (response.status === 201) {
        setSuccess("Template updated successfully!");
        setName("");
        setHtml("");
        setOpen(false);
        alert("campaign updated successfully");
        if (istemplateedit) {
          dispatch(
            settemplatedetails({
              name: TemplateName,
              html: Templatehtml,
              istemplateedit: false,
            })
          );
          navigate("/campaign");
        } else navigate("/alltemplates");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        className="model"
        closeIcon
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
      >
        <Header content="Edit Your Template" />
        <ModalContent className="create-template-model">
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <FormField>
                    <label>Name</label>
                    <input
                      placeholder="Enter Name"
                      value={TemplateName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormField>
                  <FormField>
                    <label>Html</label>
                    <textarea
                      placeholder="Enter Html"
                      rows="20"
                      cols="50"
                      onChange={(e) => setHtml(e.target.value)}
                      value={html}
                    />
                  </FormField>

                  {/* <Form.Field
                      control={Select}
                      label='Select Layout'
                      options={layoutsoptions}
                      placeholder='Select List'
                      name='selectOption'
                      value={html}
                      onChange={(e,{value})=>setHtml(value)}
                    /> */}
                  <p>{error}</p>
                </Form>
              </Grid.Column>

              <Grid.Column className="template-preview">
                <div>{parse(html)}</div>
                {/* Display template preview here */}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered={true}>
            You can personalized the Template by adding the user attributes like
            <p>
              {"{{User.Userattributes.firstname}}"}- this will be replaced by
              user FirstName
            </p>
            <p>
              {"{{User.Userattributes.LastName}}"}- this will be replaced by
              user LastName
            </p>
          </Grid>
        </ModalContent>
        <ModalActions className="modelactions">
          <Button color="green" onClick={handleSubmit}>
            Save Template
          </Button>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
};

export default EditTemplateModel;
