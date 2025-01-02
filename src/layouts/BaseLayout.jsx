import { Outlet, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const BaseLayout = ({ title, name, basePath, navItems, logout }) => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDropdown(false);
    logout();
  };

  return (
    <div className="admin-layout">
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to={basePath}>
          {title}
        </Link>
        <button 
          className="btn text-white border-0 ms-auto me-3"
          onClick={handleLogoutClick}
        >
          {name}
        </button>
      </header>

      {showLogoutDropdown && (
            <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', right: 0 }}>
              <button className="dropdown-item" onClick={handleConfirmLogout}>
                Log out
              </button>
            </div>
          )}

      <div className="container-fluid">
        <div className="row">
          <nav className="sidebar col-md-3 col-lg-2 d-md-block bg-light">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <Link 
                      to={`${basePath}/${item.path}`}
                      className="nav-link d-flex align-items-center gap-2"
                    >
                      <i className={`bi bi-${item.icon}`}></i>
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="nav flex-column ms-3">
                        {item.children.map((child) => (
                          <li className="nav-item" key={child.path}>
                            <Link
                              to={`${basePath}/${item.path}/${child.path}`}
                              className="nav-link d-flex align-items-center gap-2"
                            >
                              <i className={`bi bi-${child.icon}`}></i>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

BaseLayout.propTypes = {
  title: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    }))
  })).isRequired
};

export default BaseLayout;