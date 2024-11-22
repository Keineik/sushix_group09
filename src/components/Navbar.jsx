const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container px-5">
        <a className="navbar-brand" href="#">
          <img
            src="https://tokyodelihome.com.vn/Data/Sites/1/skins/default/img//logo.png" alt="Logo"
            width="126" height="78" className="d-inline-block align-text-top"
          />
        </a>

        <form className="d-flex w-50" role="search">
          <input
            className="form-control-md me-2 w-75" type="search" placeholder="Bạn cần tìm sản phẩm gì?"
            aria-label="Search" />
          <button className="btn btn" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search"
              viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </form>

        <button type="button" className="btn position-relative">
          <svg
            xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart3"
            viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          12
          <span className="visually-hidden">unread messages</span>
        </span>
        </button>

        <div className="btn-group">
          <button
            type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <svg
              xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
              className="bi bi-person-square" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
            </svg>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">Đăng nhập</button>
            </li>
            <li>
              <button className="dropdown-item" type="button">Đăng ký</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;