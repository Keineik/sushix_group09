import { useState, useEffect } from "react";
import { fetchBranches } from "../../api/branch";

const Branches = () => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [branches, setBranches] = useState([]);

    const loadBranches = async () => {
        try {
            const branchesResponse = await fetchBranches();
            setBranches(branchesResponse);
        } catch (error) {
            console.error("Error fetching branches:", error);
        }
    };

    const totalPages = Math.ceil(branches.length / itemsPerPage);

    const displayedBranches = branches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        loadBranches();
    }, []);

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
                                            src={branch.imgUrl}
                                            className="img-fluid rounded-top"
                                            alt={branch.altText || "Branch Image"}
                                        />
                                    </a>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-danger fw-bold">{branch.branchName}</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <i className="bi bi-geo-alt-fill text-danger"></i>
                                            <span> {branch.branchAddress}</span>
                                        </li>
                                        <li>
                                            <i className="bi bi-telephone-fill text-success"></i>
                                            <span> {branch.branchPhoneNumber}</span>
                                        </li>
                                        <li>
                                            <i className="bi bi-clock text-primary"></i>
                                            <span> {branch.openingTime}-{branch.closingTime}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <nav className="mt-4">
                <ul className="pagination justify-content-center align-items-center">
                    <li className="page-item">
                        <button
                            className="arrow-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </li>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <li className="page-item" key={index + 1}>
                            <button
                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    {/* Next button */}
                    <li className="page-item">
                        <button
                            className="arrow-btn"
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
