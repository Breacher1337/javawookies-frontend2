import { Link, useLocation } from "react-router-dom";
import './Menubar.css';

const Menubar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-light bg-white border-bottom shadow-sm fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center px-4">
                <span className="navbar-brand fw-semibold text-cookie-title mb-0 h5">
                Javawookies Admin
        </span>

                <ul className="navbar-nav d-flex flex-row mb-0">
                    <li className="nav-item me-4">
                        <Link
                            to="/"
                            className={`nav-link ${isActive("/") || isActive("/home") ? "text-cookie-title fw-semibold" : "text-dark"}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item me-4">
                        <Link
                            to="/orders"
                            className={`nav-link ${isActive("/orders") ? "text-cookie-title fw-semibold" : "text-dark"}`}
                        >
                            View Orders
                        </Link>
                    </li>
                    {/* <li className="nav-item me-4">
                        <Link
                            to="/orders/new"
                            className={`nav-link ${isActive("/orders/new") ? "text-cookie-title fw-semibold" : "text-dark"}`}
                        >
                            Create Order
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link
                            to="/history"
                            className={`nav-link ${isActive("/history") ? "text-cookie-title fw-semibold" : "text-dark"}`}
                        >
                            History
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menubar;
