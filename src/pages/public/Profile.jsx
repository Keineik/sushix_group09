import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateCustomer } from '../../api/customer';
import { fetchMembershipCardByCustomer } from '../../api/membershipCard';

const Profile = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [membershipCard, setMembershipCard] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        custName: '',
        custEmail: '',
        custPhoneNumber: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData({
                custName: user.customer.custName || '',
                custEmail: user.customer.custEmail || '',
                custPhoneNumber: user.customer.custPhoneNumber || '',
            });
        }

         fetchMembershipCardByCustomer(user.customer.custId)
                .then((data) => {
                    setMembershipCard(data);
                    setRewardPoints(data.rewardPoints || 0); 
                })
                .catch((error) => {
                    console.error('Error fetching membership card data:', error);
                });

    }, [user, isAuthenticated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any fields are empty
        if (!formData.custName || !formData.custEmail || !formData.custPhoneNumber) {
            setError('Tất cả các trường đều là bắt buộc.');
            return;
        }
        
        setError(null);

        try {
            await updateCustomer(user.customer.custId, formData);
            setSuccessMessage('Cập nhật thông tin thành công!');
            setIsEditing(false); 
            
        } catch (err) {
            setError('Không thể cập nhật thông tin, vui lòng thử lại sau.');
            console.error(err);
        }
    };

    if (!isAuthenticated) {
        return <div>Please log in to view your profile.</div>;
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
                                            <strong>Họ và Tên:</strong> {formData.custName}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Email:</strong> {formData.custEmail}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Số điện thoại:</strong> {formData.custPhoneNumber}
                                        </p>
                                    </>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="custName" className="form-label">
                                                Họ và Tên:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="custName"
                                                name="custName"
                                                value={formData.custName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="custEmail" className="form-label">
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="custEmail"
                                                name="custEmail"
                                                value={formData.custEmail}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="custPhoneNumber" className="form-label">
                                                Số điện thoại:
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="custPhoneNumber"
                                                name="custPhoneNumber"
                                                value={formData.custPhoneNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {successMessage && (
                                            <div className="alert alert-success" role="alert">
                                                {successMessage}
                                            </div>
                                        )}
                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}

                                        <div className="d-flex justify-content-end">
                                            <button
                                                type="submit"
                                                className="btn btn-success btn-sm rounded-pill px-4 py-2"
                                            >
                                                Lưu thay đổi
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm rounded-pill ms-2 px-4 py-2"
                                                onClick={() => setIsEditing(false)}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    {membershipCard ? (
                        <div className="card mb-4">
                            <div className="card-body">
                                <p className="card-title"><strong>Thẻ Thành Viên:</strong></p>
                                <p className="mb-1"><strong>Tên thẻ:</strong> {membershipCard.cardName}</p>
                                <p className="mb-1"><strong>Mã thẻ:</strong> {membershipCard.cardNumber}</p>
                                <p className="mb-1"><strong>Điểm thưởng:</strong> {rewardPoints}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info" role="alert">
                            Không có thông tin thẻ thành viên.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Profile;