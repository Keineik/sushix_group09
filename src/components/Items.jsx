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
    const categoryId = searchParams.get("categoryId") || "";
    const branchId = parseInt(localStorage.getItem('selectedBranch'), 10) || null;
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortKey = searchParams.get("sortKey") || "";
    const sortDirection = searchParams.get("sortDirection") || "";
    const filterShippable = searchParams.get("filterShippable") || "";

    const loadItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const menuItemsResponse = await fetchMenuItems({
                page: currentPage,
                limit: itemsPerPage,
                branchId: branchId,
                categoryId: categoryId,
                searchTerm: searchTerm,
                sortKey: sortKey,
                sortDirection: sortDirection,
                filterShippable: filterShippable,
            });
            console.log(menuItemsResponse);
            setItems(menuItemsResponse.items || []);
            setTotalCount(menuItemsResponse.totalCount || 0);
        } catch (err) {
            setError("Failed to fetch items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, [currentPage, categoryId, branchId, searchTerm, sortKey, sortDirection, filterShippable]);

    const handlePageChange = (page) => {
        searchParams.set("page", page);
        setSearchParams(searchParams);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <main>
            <div className="shadow">
                <div className="row border border-0 gy-2">
                    <h5 className="ps-5 py-2">SUSHIX</h5>
                </div>

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