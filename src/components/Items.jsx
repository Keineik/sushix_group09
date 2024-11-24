import { useState } from "react";

const Items = ({ items }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const displayedItems = items.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <main>
            <div className="shadow">
                <div className="row border border-0 gy-2">
                    <h5 className="ps-5 py-2">SUSHIX</h5>
                </div>
                <div class="row row-cols-3 border-0">
                    {displayedItems.map((item) => (
                        <div className="col">
                            <div class="card h-100 border-0">
                                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                    <img src={item.image} className="card-img-top img-hover" alt={item.name} />
                                </a>
                                <div class="card-body">
                                    <p class="card-text text-center">{item.name}</p>
                                    <h5 class="card-title text-center text-danger">{item.price}đ</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    {[...Array(totalPages).keys()].map((page) => (
                        <li
                            className={`page-item ${currentPage === page + 1 ? "active" : ""}`}
                            key={page + 1}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(page + 1)}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    )
}


export default Items