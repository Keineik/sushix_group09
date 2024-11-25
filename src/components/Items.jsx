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
                                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
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
    )
}


export default Items