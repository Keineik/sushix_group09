import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [rewardPoints, setRewardPoints] = useState(0);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.custName || '',
                email: user.custEmail || '',
                phone: user.custPhoneNumber || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            setError('All fields are required');
            return;
        }
        setError(null);

        //dew something XD
    };

    if (!user) {
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
                                            <strong>Họ và Tên:</strong>
                                            <div>{formData.name}</div>
                                        </p>
                                        <p className="mb-1">
                                            <strong>Email:</strong>
                                            <div>{formData.email}</div>
                                        </p>
                                        <p className="mb-1">
                                            <strong>Số điện thoại:</strong>
                                            <div>{formData.phone}</div>
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
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4" style={{ maxHeight: '50px' }}>
                        <div className="card-body p-3">
                            <p className="card-title mx-0 my-0">
                                Bạn có {rewardPoints} điểm thưởng.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;