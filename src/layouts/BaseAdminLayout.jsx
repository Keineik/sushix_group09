// src/layouts/admin/BaseAdminLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BaseAdminLayout = ({ title, basePath, navItems }) => {
  return (
    <div className="admin-layout">
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to={basePath}>
          {title}
        </Link>
      </header>

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

BaseAdminLayout.propTypes = {
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

export default BaseAdminLayout;