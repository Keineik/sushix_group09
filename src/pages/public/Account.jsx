import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Account = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop();

  return (
    <div className="account-page container mt-5">
      <h3 className="mb-4">Tài khoản của: </h3>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <Link
              to="/account/profile"
              className={`list-group-item ${activeTab === 'profile' ? 'active' : ''}`}
            >
              Thông tin tài khoản
            </Link>
            <Link
              to="/account/deliverytracking"
              className={`list-group-item ${activeTab === 'deliverytracking' ? 'active' : ''}`}
            >
              Theo dõi đơn hàng
            </Link>
            <Link
              to="/account/rewardhistory"
              className={`list-group-item ${activeTab === 'rewardhistory' ? 'active' : ''}`}
            >
              Lịch sử điểm thưởng
            </Link>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card" style={{ marginBottom: '100px' }}>
            <div className="card-body">
              <Outlet /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;