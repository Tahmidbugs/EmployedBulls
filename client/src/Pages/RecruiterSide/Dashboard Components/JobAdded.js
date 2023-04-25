import React from 'react';
import Nav from './Navbar';
function JobAdded() {
  return (
    <div style={{ display: 'flex' }}>
      <Nav />
      {/* I want these div to be adjusted as width: calc(100% - 220px) with the navbar */}
      <div className='inbox'>
        {/* <div className='dashboard'> */}
        <h2>Job Added</h2>
        {/* Add table for displaying recently added jobs here */}
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Company</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Software Engineer</td>
              <td>Acme Corporation</td>
              <td>2023-03-16</td>
            </tr>
            <tr>
              <td>Product Manager</td>
              <td>XYZ Inc.</td>
              <td>2023-03-15</td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
      </div>
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
