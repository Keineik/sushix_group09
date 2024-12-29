import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { getCurrentCustomer } from '../api/customer';

const Navbar = ({ cart, onCartClick }) => {
    const { user, setUser, logout } = useContext(AuthContext);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                try {
                    const userData = await getCurrentCustomer();
                    setUser(userData);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();
    }, [user, setUser]);

    return (
        <nav
            className="navbar bg-body-tertiary"
            style={{
                position: 'sticky',
                zIndex: 1050,
                top: 0,
                left: 0,
                width: '100%',
            }}
        >
            <div className="container px-5">
                <a className="navbar-brand" href="/">
                    <img
                        src={logo}
                        alt="Logo"
                        width="200"
                        height="95"
                        className="d-inline-block align-text-top"
                        style={{
                            marginTop: '-15px',
                        }}
                    />
                </a>

                <form className="d-flex w-50" role="search">
                    <input
                        className="form-control-md me-1.5 w-75"
                        type="search"
                        placeholder=" Bạn cần tìm sản phẩm gì?"
                        aria-label="Search"
                        style={{
                            border: '2px solid red',
                            outline: 'none',
                            marginLeft: '107px',
                        }}
                    />
                    <button
                        className="btn btn"
                        type="submit"
                        style={{
                            border: 'none',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="red"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                </form>

                <div className="d-flex justify-content-end align-items-center"></div>
                <button
                    type="button"
                    className="btn position-relative ms-auto"
                    onClick={onCartClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-cart3"
                        viewBox="0 0 16 16"
                    >
                        {/* I summon The Winged Dragon of Ra: */}
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                    <span className="position-absolute top-0 start-95 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </button>

                <div className="btn-group">
                    <button
                        type="button"
                        className="btn dropdown-toggle ms-3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            className="bi bi-person-square"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        </svg>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        {user ? (
                            <>
                                <li>
                                    <Link to="/account" className="dropdown-item">
                                        Thông tin tài khoản
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logout} className="dropdown-item">
                                        Đăng xuất
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="dropdown-item">
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="dropdown-item">
                                        Đăng ký
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;