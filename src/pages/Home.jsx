import './style/Home.css';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <section className="hero-1 d-flex align-items-center justify-content-center text-white text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h1 className="display-4 fw-bold mb-3">
                                Welcome to <span className="text-cookie-title ">Javawookies</span> Admin Page
                            </h1>
                            <p className="lead mb-4">
                                Manage customer orders, track sales history, and keep your Javawookies café running smoothly — all in one dashboard.
                            </p>
                            <div className="d-flex gap-3 justify-content-center">
                                <Link to="/orders" className="btn btn-outline-light btn-lg shadow-sm text-cookie border-cookie">
                                    <i className="fas fa-box me-2"></i>
                                    View Orders
                                </Link>
                                {/* <Link to="/orders/new" className="btn btn-outline-light btn-lg shadow-sm text-cookie border-cookie">
                                    <i className="fas fa-plus-circle me-2"></i>
                                    Create New Order
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
