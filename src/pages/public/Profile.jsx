import React, { useState } from 'react';

const Profile = () => {
  // Use state to hold the user data
  const [user, setUser] = useState({
    name: 'Nguyễn Quang Huy',
    email: 'qhuy180624@gmail.com',
    phone: '0327419955',
  });

  return (
    <main className="container mt-0 p-0" style={{ padding: '0', margin: '0' }}>
      <h3 className="section-title" style={{ color: '#E82429', fontWeight: 'bold' }}>
        Thông tin cá nhân
      </h3>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="card-title">Chỉnh  sửa</h6>
              <div style={{ lineHeight: '2' }}>
                <p className="mb-1">
                  <strong>Họ và Tên:</strong>
                  <div>{user.name}</div>
                </p>
                <p className="mb-1">
                  <strong>Email:</strong>
                  <div>{user.email}</div>
                </p>
                <p className="mb-1">
                  <strong>Số điện thoại:</strong>
                  <div>{user.phone}</div>
                </p>
              </div>
            </div>
          </div>

          <div className="card mb-1">
            <div className="card-body">
              <h6 className="card-title">Bạn có 0 điểm thưởng.</h6>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
