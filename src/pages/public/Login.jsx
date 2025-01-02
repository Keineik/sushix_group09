import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login({ username, password });
        } catch (err) {
            setError(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác!');
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
                    ĐĂNG NHẬP
                </h4>
            </div>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <hr />
                        {error && <p className="text-danger text-center">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label htmlFor="username">Tên Đăng Nhập (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="password">Mật Khẩu (*)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-danger w-100"
                                disabled={loading}
                            >
                                {loading ? 'Đăng Nhập...' : 'Đăng Nhập'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;