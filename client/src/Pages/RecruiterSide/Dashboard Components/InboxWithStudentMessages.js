import React from "react";
import "./dashboardstyle.css";
import Chat from "../../StudentSide/Chat";
import Nav from "./Navbar";
function InboxWithStudentMessages() {
  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <div className="inbox" style={{ width: "80%" }}>
        <div className="dashboard">
          <h2>Inbox with Student Messages</h2>
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
                <td>John Doe</td>
                <td className="inbox__message">
                  <Chat senderId={12} receiverId={21} />
                </td>
                <td>2023-03-16</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td className="inbox__message">
                  <Chat senderId={12} receiverId={22} />
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

export default InboxWithStudentMessages;
