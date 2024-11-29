import { Link } from "react-router-dom"

const AdminSidebar = () => {
    return (
        <div className="sidebar border border-right col-lg-2 p-0 bg-body-tertiary py-4">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1">
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link d-flex align-items-center gap-2">
                                <i className="bi bi-house-fill"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/menu" className="nav-link d-flex align-items-center gap-2">
                                <i className="bi bi-list"></i>
                                Menu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/orders" className="nav-link d-flex align-items-center gap-2">
                                <i className="bi bi-cart-fill"></i>
                                Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/users" className="nav-link d-flex align-items-center gap-2">
                                <i className="bi bi-people-fill"></i>
                                Users
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar