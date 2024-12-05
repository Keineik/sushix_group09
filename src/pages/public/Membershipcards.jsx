import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Membershipcards = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop();

  return (
    <div className="membershipcards-page container">
      <div className="zone-navigation d-flex justify-content-center">
  <ul className="nav gap-3">
    <li className="nav-item">
      <Link
        to="/membershipcards/cardspolicy"
        className={`nav-link custom-btn ${activeTab === 'cardspolicy' ? 'active' : ''}`}
      >
        Chính sách thẻ thành viên
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/membershipcards/lookupcards"
        className={`nav-link custom-btn ${activeTab === 'lookupcards' ? 'active' : ''}`}
      >
        Tra cứu thẻ thành viên
      </Link>
    </li>
  </ul>
</div>

      <Outlet/>
    </div>
  );
};
export default Membershipcards;