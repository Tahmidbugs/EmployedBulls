import React, { useState } from "react";
import JobComponent from "../../Components/JobComponent";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const JobFeed = () => {
const [filter, setFilter] = useState("all");

const handleFilterChange = (event) => {
setFilter(event.target.value);
};

return (
<>
<h1>Job List</h1>
<Navbar bg="dark" expand="lg" className="navbar-lg">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <div className="d-flex justify-content-between">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Profile</Nav.Link>
        <Nav.Link href="#link">Saved Jobs</Nav.Link>
        <Nav.Link href="#link">Application Centre</Nav.Link>
        <Nav.Link href="#link">Sign Out</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          as="select"
          onChange={handleFilterChange}
          value={filter}
        >
          <option value="all">Display All Jobs</option>
          <option value="hiring">Display Jobs Still Hiring</option>
        </FormControl>
        <Button variant="outline-success">Filter</Button>
      </Form>
    </div>
  </Navbar.Collapse>
</Navbar>

<div>
{filter === "all" ? (
<>
<JobComponent />
<JobComponent />
<JobComponent />
<JobComponent />
</>
) : (
<>
<JobComponent hiring={true} />
<JobComponent hiring={true} />
</>
)}
</div>
</>
);
};

export default JobFeed;



