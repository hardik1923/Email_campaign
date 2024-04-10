import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewTemplate from "./CreateTemplate";
import {
  Button,
  ListItem,
  ListContent,
  List,
  Search,
  Pagination,
  Icon,
} from "semantic-ui-react";

import "./Allsegments.css";
import TemplatepreviewModel from "./TemplatepreviewModel";
import { settemplatedetails } from "../features/counter/Template";
//import CreateTemplate from "./CreateTemplate";
import Templateeditmodel from "./Templateeditmodel";
import axios from "axios";

function AllTemplates() {
  // ... (rest of the code)
  const dispatch = useDispatch();
  const email = useSelector((state) => state.User.email);
  const Navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditTemp, setOpenEditTemp] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newtemplatehandler, setnewtemplatehandler] = useState(false); // Change this value as per your requirement

  const getalltemplates = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/usertemplates/getalltemplates/${email}`
      );
      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getalltemplates();
  }, []);

  const handleTemplatePreview = (html) => {
    dispatch(settemplatedetails({ html: html }));
    setOpen(true);
  };

  const handleEditTemplate = (name, html) => {
    dispatch(
      settemplatedetails({
        name: name,
        html: html,
        istemplateedit: true,
      })
    );
    setOpenEditTemp(true);
  };

  const handleSort = (sortByField) => {
    if (sortBy === sortByField) {
      // If already sorted by this field, reverse the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a different field, set it as the new sort field and default to ascending order
      setSortBy(sortByField);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (e, { value }) => {
    setSearchTerm(value);
  };

  const handlePaginationChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    const valA = a[sortBy].toLowerCase();
    const valB = b[sortBy].toLowerCase();

    if (valA < valB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (valA > valB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handledeleteemplate = (templateId) => {
    console.log(templateId);
    const res = axios.delete(
      `http://localhost:3000/usertemplates/deletetemplate/${templateId}`
    );
    if (res.status === 200) {
      alert("Template deleted successfully");
    }
    const filteredtemplates = templates.filter(
      (template) => template._id !== templateId
    );
    setTemplates(filteredtemplates);
  };

  // Pagination
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTemplates = sortedTemplates.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlenewtemp = () => {
    setnewtemplatehandler(!newtemplatehandler);
  };

  return (
    <div className="segment-list">
      <div className="alltemps-header">
        <h1>Your Templates</h1>

        <Search
          placeholder="Search templates..."
          value={searchTerm}
          onSearchChange={handleSearchChange}
          className="template-search"
        />
        {/* <Button onClick={() => Navigate("/newsegment")}>
          Create New Template
        </Button> */}
        <NewTemplate newtemplatehandle={handlenewtemp} />
      </div>

      <List divided verticalAlign="middle" className="template-list">
        <ListItem className="template-list-header">
          <ListContent onClick={() => handleSort("name")}>
            Template Name
          </ListContent>
        </ListItem>
        {currentTemplates.map((template, index) => (
          <ListItem key={index}>
            <ListContent floated="right" className="template-list-actions">
              <button onClick={() => handledeleteemplate(template._id)}>
                <Icon name="trash alternate" />
              </button>
              <Button
                onClick={() => handleEditTemplate(template.name, template.html)}
                className="template-edit-button"
              >
                <Icon name="edit" />
              </Button>
              <Button onClick={() => handleTemplatePreview(template.html)}>
                Preview Template
              </Button>
            </ListContent>
            <ListContent>
              {indexOfFirstItem + index + 1}_{template.name}
            </ListContent>
          </ListItem>
        ))}
      </List>
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
        className="pagination"
      />
      <TemplatepreviewModel open={open} setOpen={setOpen} />
      <Templateeditmodel open={openEditTemp} setOpen={setOpenEditTemp} />
    </div>
  );
}

export default AllTemplates;
//
