import React from 'react';
import './dashboardstyle.css';

function InboxWithStudentMessages() {
  return (
    <div className='inbox'>
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
            <td className='inbox__message'>
              Hi, I'm interested in the software engineer position.
            </td>
            <td>2023-03-16</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td className='inbox__message'>
              Can you tell me more about the benefits package?
            </td>
            <td>2023-03-15</td>
          </tr>
        </tbody>
      </table>

      <input
        type='text'
        className='inbox__input'
        placeholder='Type your message here'
      />
      <button className='inbox__button'>Send Message</button>
    </div>
  );
}

export default InboxWithStudentMessages;
