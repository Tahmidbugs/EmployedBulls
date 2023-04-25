import React, { useContext } from "react";
import Nav from "./Navbar";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
function JobAdded() {
  const { user, dispatch } = useContext(AuthContext);

  const [addedJobs, setAddedJobs] = React.useState([]);
  //fetch added jobs by recruiter user.email
  React.useEffect(() => {
    axios
      .get("http://localhost:8800/api/job/getJobsByRecruiter", {
        params: {
          email: user.email,
        },
      })
      .then((res) => {
        setAddedJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Nav />

      <div
        style={{
          width: "80%",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          alignItems: "center",
        }}
      >
        <h2 style={{ alignSelf: "center" }}>Job Added</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            alignItems: "center",
          }}
        >
          {addedJobs.map((job) => (
            <JobCard key={job.jobid} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
function JobCard({ job }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: "#252525",
        borderRadius: "10px",
        boxShadow: isHovered
          ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
          : "0px 0px 5px 0px rgba(0, 0, 0, 0.3)",
        padding: "15px",
        marginBottom: "20px",
        border: "1px solid #252525",
        color: "#D9D9D9",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{ marginBottom: "10px" }}>{job.company_name}</h3>
      <h4 style={{ marginBottom: "10px" }}>{job.position_name}</h4>
      <p style={{ marginBottom: "10px" }}>{job.jobdescription}</p>
      <p style={{ marginBottom: "5px" }}>
        <strong style={{ color: "#FF3953" }}>Hiring:</strong> {job.hiring}
      </p>
      <p style={{ marginBottom: "5px" }}>
        <strong style={{ color: "#D9D9D9" }}>Salary:</strong> {job.salary}
      </p>
    </div>
  );
}

//       <div>
//         <h2>Job Added</h2>
//         {/* Add table for displaying recently added jobs here */}
//         <table>
//           <thead>
//             <tr>
//               <th>Position</th>
//               <th>Company</th>
//               <th>Date Added</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Software Engineer</td>
//               <td>Acme Corporation</td>
//               <td>2023-03-16</td>
//             </tr>
//             <tr>
//               <td>Product Manager</td>
//               <td>XYZ Inc.</td>
//               <td>2023-03-15</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

export default JobAdded;
