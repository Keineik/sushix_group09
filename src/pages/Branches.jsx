import { useState } from "react";
import branches from "../dummy/branches.json";

const Branches = () => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(branches.length / itemsPerPage);

    const displayedBranches = branches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <main>
            <div>
                <h3
                    className="section-title text-center mt-4"
                    style={{
                        color: "#E82429",
                        fontWeight: "bold",
                    }}
                >
                    Chuỗi Cửa Hàng
                </h3>
            </div>
            <div className="container py-4">
                <div className="row g-4">
                    {displayedBranches.map((branch, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-img-top">
                                    <a href="#">
                                        <img
                                            src={branch.imgSrc}
                                            className="img-fluid rounded-top"
                                            alt={branch.altText || "Branch Image"}
                                        />
                                    </a>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-danger fw-bold">{branch.name}</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <i className="bi bi-geo-alt-fill text-danger"></i>
                                            <span> {branch.address}</span>
                                        </li>
                                        <li>
                                            <i className="bi bi-telephone-fill text-success"></i>
                                            <span> {branch.phone}</span>
                                        </li>
                                        <li>
                                            <i className="bi bi-clock text-primary"></i>
                                            <span> {branch.hours}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    {/* Previous button */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </li>

                    {/* Page numbers */}
                    {[...Array(totalPages).keys()].map((page) => (
                        <li
                            className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
                            key={page + 1}
                        >
                            <button
                                className="page-link"
                                type="button"
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}

                    {/* Next button */}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </main>
    );
};

export default Branches;
