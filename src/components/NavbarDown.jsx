import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavbarDown = () => {
  const [activeNav, setActiveNav] = useState(null);

  const handleNavClick = (navIndex) => {
    setActiveNav(navIndex);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        position: 'sticky',
        zIndex: 1049,
        top: '105px',
        left: 0,
        right: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container px-3">
        <select className="form-select w-25" aria-label="Select Branch">
          <option selected>Chọn Chi Nhánh</option>
          <option value="1">366A3 Phan Văn Trị, Quận Gò Vấp</option>
          <option value="2">242 - 244 Phan Xích Long, Q. Phú Nhuận</option>
          <option value="3">31 - 33 Nguyễn Thị Thập, Him Lam, Q.7</option>
        </select>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a
              className={`nav-link ${activeNav === 0 ? 'text-danger' : ''}`}
              aria-current="page"
              href="/about"
              onClick={() => handleNavClick(0)}
            >
              <b>GIỚI THIỆU</b>
            </a>
            <a
              className={`nav-link ${activeNav === 1 ? 'text-danger' : ''}`}
              href="/menu"
              onClick={() => handleNavClick(1)}
            >
              <b>THỰC ĐƠN</b>
            </a>
            <a
              className={`nav-link ${activeNav === 2 ? 'text-danger' : ''}`}
              href="/branches"
              onClick={() => handleNavClick(2)}
            >
              <b>HỆ THỐNG CỬA HÀNG</b>
            </a>
            <a
              className={`nav-link ${activeNav === 3 ? 'text-danger' : ''}`}
              href="/membershipcards"
              onClick={() => handleNavClick(3)}
            >
              <b>THẺ THÀNH VIÊN</b>
            </a>
            <a
              className={`nav-link ${activeNav === 4 ? 'text-danger' : ''}`}
              href="/promotions"
              onClick={() => handleNavClick(4)}
            >
              <b>KHUYẾN MÃI</b>
            </a>
            <a
              className={`nav-link ${activeNav === 5 ? 'text-danger' : ''}`}
              href="/reservation"
              onClick={() => handleNavClick(5)}
            >
              <b>ĐẶT BÀN</b>
            </a>
          </div>
          <Link to="/deliverytracking" className="btn btn-outline-danger ms-auto d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-file-earmark-text"
              viewBox="0 0 16 16"
            >
              <path
                d="M9 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5l-3-3zM4 1h5v4h4v10H4V1z"
              />
              <path d="M5 7h4v1H5zM5 9h4v1H5zM5 11h4v1H5z" />
            </svg>
            Kiểm tra đơn hàng
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDown;