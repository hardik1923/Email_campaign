import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import Reactemaileditor from "./Reactemaileditor";
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
import { MenuItem, Menu, Select } from "semantic-ui-react";
import "./CreateTemplate.css";
// import Template from "../Template";
import parse from "html-react-parser";
// import { settemplatedetails } from "../features/counter/Template";
// import { Navigate } from "react-router-dom";

const CreateTemplate = (props) => {
  const { newtemplatehandle } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.User.email);
  //  const istemplateedit = useSelector((state) => state.Template.istemplateedit);
  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);
  const [layouts, setlayouts] = useState([]);
  const [activeItem, setactiveItem] = useState("Html");

  const handleItemClick = (e, { name }) => setactiveItem(name);

  useEffect(() => {
    const getalllayouts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/layouts/getalllayouts"
        );
        if (res.status === 201) {
          const data = res.data;
          setlayouts(data.layouts);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getalllayouts();
  }, []);

  const layoutsoptions = layouts.map((layout, index) => ({
    key: index,
    text: layout.name,
    value: layout.html,
  }));
  console.log(layoutsoptions);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !html) return alert("Please fill all the fields");
    // setIsLoading(true);
    // setError(null);
    // setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/usertemplates/newtemplate",
        {
          email,
          name,
          html,
        }
      );

      if (response.status === 201) {
        //setSuccess("Template created successfully!");
        setName("");
        setHtml("");
        newtemplatehandle();
        setOpen(false);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    } finally {
      //setIsLoading(false);
    }
  };
  const handleopenhtmlbuilder = () => {
    navigate("/reactemaileditor");
  };

  return (
    <div>
      <Modal
        className="model"
        closeIcon
        open={open}
        trigger={<Button>Create New Template</Button>}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
      >
        <Header content={`Create New Template From ${activeItem}`} />
        <ModalContent className="create-template-model">
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Form>
                  <FormField>
                    <label>Enter Name</label>
                    <input
                      placeholder="Enter Template Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormField>
                </Form>
                <Menu attached="top" tabular>
                  <MenuItem
                    name="Html"
                    active={activeItem === "Html"}
                    onClick={handleItemClick}
                  />
                  <MenuItem
                    name="Plain Text"
                    active={activeItem === "Plain Text"}
                    onClick={handleItemClick}
                  />
                </Menu>
                <Segment attached="bottom">
                  <Form>
                    <FormField>
                      <textarea
                        placeholder="Enter Html"
                        rows="10"
                        cols="50"
                        onChange={(e) => setHtml(e.target.value)}
                        value={html}
                      />
                    </FormField>

                    {activeItem === "Html" && (
                      <Form.Field
                        control={Select}
                        label="Select Layout"
                        options={layoutsoptions}
                        placeholder="Select List"
                        name="selectOption"
                        value={html}
                        onChange={(e, { value }) => setHtml(value)}
                      />
                    )}
                    <p>{error}</p>
                  </Form>
                </Segment>
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
              user Firstname
            </p>
            <p>
              {"{{User.Userattributes.firstname}}"}- this will be replaced by
              user LastName
            </p>
          </Grid>
        </ModalContent>
        <ModalActions className="modelactions">
          <Button color="green" onClick={handleSubmit}>
            Create Template
          </Button>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>

          <Button color="black" onClick={handleopenhtmlbuilder}>
            <Icon name="remove" /> Create From Html Builder
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
};

export default CreateTemplate;
