import React, { useState } from "react";
import "../RecruiterSide/Dashboard Components/dashboardstyle.css";
import Chat from "./Chat";
import Nav from "./Navbar";
function StudentInbox() {
  const [activeChat, setActiveChat] = useState(null);

  const handleStudentClick = (receiverId) => {
    setActiveChat(receiverId);
  };

  const studentProfilePictures = {
    21: "https://img.freepik.com/premium-vector/portrait-beautiful-young-woman-with-short-wavy-hair_478440-368.jpg",
    22: "https://scontent.ftpa1-2.fna.fbcdn.net/v/t31.18172-8/15732054_1829744933948321_6912147507579640372_o.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=B32qzT7yVPUAX-fjQ1F&_nc_ht=scontent.ftpa1-2.fna&oh=00_AfDK8QeAwi9cQRERIju8M27Ftyr8N0FSPleOzipc5SHZJA&oe=6471C0BB",
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#F5F5F5",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/batthern.png)",
      }}
    >
      <Nav />
      <div className="inbox">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >
          <h1 style={{ color: "#FF3953" }}>Conversations</h1>
          {/* Add table for displaying student messages here */}
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src={studentProfilePictures[22]}
                    alt="John Doe Profile"
                    width="50"
                  />
                  <a href="#" onClick={() => handleStudentClick(21)}>
                    John Doe
                  </a>
                </td>
                <td className="inbox__message">
                  <Chat
                    senderId={12}
                    receiverId={21}
                    active={activeChat === 21}
                  />
                </td>
                <td>2023-03-16</td>
              </tr>
              <tr>
                <td>
                  <img
                    src={studentProfilePictures[21]}
                    alt="Jane Smith Profile"
                    width="50"
                  />
                  <a href="#" onClick={() => handleStudentClick(22)}>
                    Jane Smith
                  </a>
                </td>
                <td className="inbox__message">
                  <Chat
                    senderId={12}
                    receiverId={22}
                    active={activeChat === 22}
                  />
                </td>
                <td>2023-03-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default StudentInbox;
