import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 3;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li key={i} className="page-item">
            <button className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
    } else {
      for (let i = 1; i <= maxPagesToShow; i++) {
        pages.push(
          <li key={i} className="page-item">
            <button className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }

      if (currentPage > maxPagesToShow + 1) {
        pages.push(<li key="ellipsis1" className="page-item disabled"><span className="pagination-btn">...</span></li>);
      }

      const startPage = Math.max(maxPagesToShow+1, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i} className="page-item">
            <button className={`pagination-btn ${currentPage === i ? 'active' : ''}`} onClick={() => onPageChange(i)}>
              {i}
            </button>
          </li>
        );
      }
      if (currentPage < totalPages - maxPagesToShow) {
        pages.push(<li key="ellipsis2" className="page-item disabled"><span className="pagination-btn">...</span></li>);
      }

      pages.push(
        <li key={totalPages} className="page-item">
          <button className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }



    return pages;
  };

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="arrow-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>
        {renderPagination()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="arrow-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;