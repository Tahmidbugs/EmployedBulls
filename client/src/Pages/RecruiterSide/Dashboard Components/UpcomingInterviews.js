import React from 'react';

function UpcomingInterviews() {
  return (
    <div>
      <h2>Upcoming Interviews</h2>
      {/* Add table for displaying upcoming interviews here */}
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Position</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Software Engineer</td>
            <td>2023-03-18</td>
            <td>10:00 AM</td>
            <td>123 Main St.</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>Product Manager</td>
            <td>2023-03-20</td>
            <td>2:00 PM</td>
            <td>456 Elm St.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UpcomingInterviews;
