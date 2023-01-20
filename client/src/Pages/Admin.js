import React, { useState } from 'react';

const AdminPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', status: 'pending' },
    { id: 2, name: 'User 2', email: 'user2@example.com', status: 'pending' },
    { id: 3, name: 'User 3', email: 'user3@example.com', status: 'pending' },
  ]);

  const handleApprove = (id) => {
    setUsers(users.map((user) => {
      if (user.id === id) {
        return { ...user, status: 'approved' };
      }
      return user;
    }));
  }

  const handleDeny = (id) => {
    setUsers(users.map((user) => {
      if (user.id === id) {
        return { ...user, status: 'denied' };
      }
      return user;
    }));
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Recruiter Authorization Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.sort((a, b) => a.id - b.id).map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleApprove(user.id)} disabled={user.status === 'approved'}>Approve</button>
                <button onClick={() => handleDeny(user.id)} disabled={user.status === 'denied'}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
