import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMenuItems } from "../api/menuItem.js";

const Items = ({ onAddToCart }) => {
    const itemsPerPage = 12;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    // Fetch items from the server
    const loadItems = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const { result } = await fetchMenuItems({ page, limit: itemsPerPage });

            setItems(result.items);
            setTotalCount(result.totalCount);
        } catch (err) {
            setError("Failed to fetch items.");
        } finally {
            setLoading(false);
        }
    };

    // Trigger loading items whenever the page changes
    useEffect(() => {
        loadItems(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setSearchParams({ page: page }); // Update the query parameter
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage); // Calculate total pages

    return (
        <main>
            <div className="shadow">
                <div className="row border border-0 gy-2">
                    <h5 className="ps-5 py-2">SUSHIX</h5>
                </div>

                {/* Conditional rendering for loading and error states */}
                {loading ? (
                    <p className="text-center">Loading items...</p>
                ) : error ? (
                    <p className="text-danger text-center">{error}</p>
                ) : (
                    <div className="items-grid">
                        {items.map((item, index) => (
                            <div className="grid-item" key={item.itemId}>
                                <div className="card h-100 border-0">
                                    <Link to={`item/${item.itemId}`}>
                                        <img
                                            src={item.imgUrl}
                                            className="card-img-top img-hover"
                                            alt={item.itemName}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <p className="card-text text-center">{item.itemName}</p>
                                        <h5 className="card-title text-center text-danger">
                                            {item.unitPrice.toLocaleString()}đ
                                        </h5>
                                        <button
                                            className="order-btn"
                                            onClick={() => onAddToCart(item)}
                                        >
                                            <b>ĐẶT HÀNG</b>
                                        </button>
                                    </div>
                                </div>
                                {index % 3 !== 2 && <div className="vertical-divider"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
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

                    {[...Array(totalPages)].map((_, index) => (
                        <li className="page-item" key={index + 1}>
                            <button
                                className={`pagination-btn ${
                                    currentPage === index + 1 ? "active" : ""
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

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

export default Items;