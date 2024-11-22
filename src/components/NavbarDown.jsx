import {useState} from 'react';

const NavbarDown = () => {
  const [activeNav, setActiveNav] = useState(null);

  const handleNavClick = (navIndex) => {
    setActiveNav(navIndex);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container px-5">
        <select className="form-select w-25" aria-label="Select Branch">
          <option selected>Chọn Chi Nhánh</option>
          <option value="1">366A3 Phan Văn Trị, Quận Gò Vấp</option>
          <option value="2">242 - 244 Phan Xích Long, Q. Phú Nhuận</option>
          <option value="3">31 - 33 Nguyễn Thị Thập, Him Lam, Q.7</option>
        </select>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className={`nav-link ${activeNav === 0 ? 'text-danger' : ''}`}
              aria-current="page"
              href="#"
              onClick={() => handleNavClick(0)}
            >
              <b>GIỚI THIỆU</b>
            </a>
            <a
              className={`nav-link ${activeNav === 1 ? 'text-danger' : ''}`}
              href="#"
              onClick={() => handleNavClick(1)}
            >
              <b>THỰC ĐƠN</b>
            </a>
            <a
              className={`nav-link ${activeNav === 2 ? 'text-danger' : ''}`}
              href="#"
              onClick={() => handleNavClick(2)}
            >
              <b>HỆ THỐNG CỬA HÀNG</b>
            </a>
            <a
              className={`nav-link ${activeNav === 3 ? 'text-danger' : ''}`}
              href="#"
              onClick={() => handleNavClick(3)}
            >
              <b>THẺ THÀNH VIÊN</b>
            </a>
            <a
              className={`nav-link ${activeNav === 4 ? 'text-danger' : ''}`}
              href="#"
              onClick={() => handleNavClick(4)}
            >
              <b>LIÊN HỆ</b>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDown;
