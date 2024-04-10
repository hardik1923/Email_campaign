import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListContent,
  Button,
  List,
  Pagination,
  Search,
} from "semantic-ui-react";
import "./Allsegments.css";

function Allsegments() {
  const api_url = "http://localhost:3000";
  const email = useSelector((state) => state.User.email);
  const Navigate = useNavigate();
  const [segments, setSegments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value as per your requirement

  useEffect(() => {
    const getallsegments = async () => {
      try {
        const response = await fetch(
          `${api_url}/segments/getsegments/${email}`
        );
        const data = await response.json();
        setSegments(data);
      } catch (error) {
        console.error(error);
      }
    };
    getallsegments();
  }, []);

  const handleSegmentDownload = async (s3url) => {
    try {
      const response = await fetch(`${api_url}/segments/downloadsegment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ s3url: s3url }),
      });
      const data = await response.json();
      const csvData = data.csv;
      const handleDownload = () => {
        const csvContent = csvData.split("\n").join("\r\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      handleDownload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedSegments = [...segments].sort((a, b) => {
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

  const filteredSegments = sortedSegments.filter((segment) =>
    segment.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredSegments.length / itemsPerPage);

  const handlePaginationChange = (e, { activePage }) => {
    setCurrentPage(activePage);
  };

  const handledeletesegment = async (segment_id) => {
    const res = axios.delete(`${api_url}/segments/deletesegment/${segment_id}`);
    if (res.status === 200) {
      alert("Segment deleted successfully");
    }
    const filteredsegments = segments.filter(
      (segment) => segment.Id !== segment_id
    );
    setSegments(filteredsegments);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSegments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="segment-list">
      <h1>Your Lists</h1>

      <div className="allsegments-header">
        <Button onClick={() => Navigate("/newsegment")}>Create New List</Button>
        <Search
          className=""
          input={{ icon: "search", iconPosition: "left" }}
          placeholder="Search segments..."
          value={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Import From database</Button>
      </div>

      <List divided verticalAlign="middle">
        <ListItem>
          <ListContent floated="right"></ListContent>
          <ListContent>
            <b onClick={() => handleSort("name")}>List Name</b>
          </ListContent>
        </ListItem>
        {currentItems.map((segment, index) => (
          <ListItem key={index}>
            <ListContent floated="right">
              <button onClick={() => handledeletesegment(segment.Id)}>
                Delete
              </button>
              <Button onClick={() => handleSegmentDownload(segment.s3url)}>
                Download List
              </Button>
              {segment._id}
            </ListContent>
            <ListContent>
              {indexOfFirstItem + index + 1}_{segment.name}
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
      />
    </div>
  );
}

export default Allsegments;
