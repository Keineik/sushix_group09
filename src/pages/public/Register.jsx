import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        membershipCode: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const { register } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Show loading state during API call

    // Handle form input changes dynamically
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);


        if (formData.password !== formData.confirmPassword) {
            setError('Mật Khẩu và Xác Nhận Mật Khẩu không khớp!');
            setLoading(false);
            return;
        }

        try {
            await register(formData);
            setSuccess(true);
            setFormData({
                username: '',
                phone: '',
                email: '',
                membershipCode: '',
                fullName: '',
                password: '',
                confirmPassword: '',
            });
        } catch (err) {
            setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div>
                <h4
                    className="section-title text-center mt-4"
                    style={{
                        color: '#D32F2F',
                        fontWeight: 'bold',
                    }}
                >
                    ĐĂNG KÝ TÀI KHOẢN
                </h4>
            </div>
            <div className="container py-4">
                <p className="text-center">
                    Đăng ký tài khoản để nhận ưu đãi và cập nhật thông tin
                </p>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <hr />
                        {error && <p className="text-danger text-center">{error}</p>}
                        {success && (
                            <p className="text-success text-center">
                                Đăng ký thành công! Bây giờ bạn có thể đăng nhập.
                            </p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label htmlFor="username">Tên Đăng Nhập (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="phone">Số Điện Thoại (*)</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="email">Email (*)</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="membershipCode">Mã Thẻ Thành Viên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="membershipCode"
                                    value={formData.membershipCode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="fullName">Họ & Tên (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="password">Mật Khẩu (*)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu (*)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-danger w-100"
                                disabled={loading}
                            >
                                {loading ? 'Đang Đăng Ký...' : 'Đăng Ký'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;