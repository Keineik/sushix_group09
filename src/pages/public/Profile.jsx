import React, { useState, useEffect } from 'react';
import customers from '../../dummy/customers.json';
import Membershipcards from '../../dummy/membershipcards.json';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loggedInCustID = 1;

    const loggedInUser = customers.find((customer) => customer.CustID === loggedInCustID);
    const loggedInMembershipCard = Membershipcards.find((card) => card.CustID === loggedInCustID);

    if (loggedInUser) {
      setUser({
        name: loggedInUser.CustName,
        email: loggedInUser.CustEmail,
        phone: loggedInUser.CustPhoneNumber,
        rewardPoints: loggedInMembershipCard.Points,
      });

      setFormData({
        name: loggedInUser.CustName,
        email: loggedInUser.CustEmail,
        phone: loggedInUser.CustPhoneNumber
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError('All fields are required');
      return;
    }

    setError(null);
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mt-0 p-0" style={{ padding: '0', margin: '0' }}>
      <h3 className="section-title" style={{ color: '#E82429', fontWeight: 'bold' }}>
        Thông tin cá nhân
      </h3>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body position-relative">
              <button
                className="edit-button mb-1"
                onClick={() => setIsEditing(true)}
                style={{
                  fontSize: '0.8rem', 
                  padding: '4px 1px', 
                  color: '#007bff', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#0056b3')} 
                onMouseOut={(e) => (e.target.style.color = '#007bff')}
              >
                Chỉnh sửa
              </button>


              <div style={{ lineHeight: '2' }}>
                {!isEditing ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Họ và Tên:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Số điện thoại:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success btn-sm rounded-pill px-4 py-2">
                          Lưu thay đổi
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm rounded-pill ms-2 px-4 py-2"
                          onClick={() => {
                            setIsEditing(false);
                            setError(null);
                            setSuccessMessage('');
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>

            </div>
          </div>

          <div className="card mb-4" style={{ maxHeight: '50px' }}>
            <div className="card-body p-3">
              <p className="card-title mx-0- my-0">
                Bạn có {user.rewardPoints} điểm thưởng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
