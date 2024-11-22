const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container px-5">
        <a className="navbar-brand" href="#">
          <img
            src="https://tokyodelihome.com.vn/Data/Sites/1/skins/default/img//logo.png" alt="Logo" width="126"
            height="78"
            className="d-inline-block align-text-top"
          />
        </a>

        <form className="d-flex w-50" role="search">
          <input className="form-control-lg me-1 w-100" type="search" placeholder="Bạn cần tìm sản phẩm gì?" aria-label="Search" />
          <button className="btn btn" type="submit">🔍</button>
        </form>

        <button type="button" className="btn btn-primary position-relative">
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          12
          <span className="visually-hidden">unread messages</span>
        </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;