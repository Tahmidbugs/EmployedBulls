import React from 'react';
import { Link } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { RxDashboard } from 'react-icons/rx';
import { FcBusiness, FcSettings, FcList } from 'react-icons/fc';
import { IoIosAddCircleOutline } from 'react-icons/io';
const Nav = () => {
  return (
    <div style={{ width: '20%' }}>
      <nav>
        <h1>EmployedBulls</h1>
        <ul>
          <li>
            <Link to='/Dashboard'>
              <FcList size={30} style={{ color: 'white', marginRight: '5' }} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/recJobFeed'>
              <FcBusiness
                size={30}
                style={{ color: 'white', marginRight: '5' }}
              />
              Recruiter Job Feed
            </Link>
          </li>
          <li>
            <Link to='/JobAdded'>
              <IoIosAddCircleOutline
                size={30}
                style={{ color: 'silver', marginRight: '5' }}
              />
              Job Added
            </Link>
          </li>
          <li>
            <Link to='/InboxRec'>
              <FcSettings
                size={30}
                style={{ color: 'white', marginRight: '5' }}
              />
              Inbox
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
