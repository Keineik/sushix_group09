import React, { useState, useEffect } from 'react';
import { fetchInvoices } from '../../../api/invoice';
import Pagination from '../../../components/Pagination';

const InvoiceManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [branchId, setBranchId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState(0); // 0: ASC, 1: DESC
    const ITEMS_PER_PAGE = 18;

    useEffect(() => {
        const loadInvoices = async () => {
            setLoading(true);
            try {
                const result = await fetchInvoices({
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    searchTerm,
                    branchId: branchId || 0,
                    startDate,
                    endDate,
                    sortDirection, // Pass the sort direction to the API
                });
                setInvoices(result.items || []);
                setTotalCount(result.totalCount || 0);
            } catch (error) {
                setError('Error fetching invoices');
            } finally {
                setLoading(false);
            }
        };
        loadInvoices();
    }, [currentPage, searchTerm, branchId, startDate, endDate, sortDirection]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleBranchChange = (e) => {
        setBranchId(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleSort = () => {
        setSortDirection((prev) => (prev === 0 ? 1 : 0)); // Toggle sort direction (0 <-> 1)
    };

    return (
        <div className="container mt-4">
            <div
                className="d-flex align-items-center mb-4 p-3"
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
            >
                {/* Search Box */}
                <div className="me-3 flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by InvoiceID, Customer Name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {/* Filter Box */}
                <div className="d-flex align-items-center gap-2">
                    {/* Branch ID */}
                    <input
                        type="text"
                        className="form-control"
                        value={branchId}
                        onChange={handleBranchChange}
                        placeholder="Enter BranchID"
                        style={{ width: '150px' }}
                    />

                    {/* Start Date */}
                    <input
                        type="date"
                        className="form-control"
                        value={startDate}
                        onChange={handleStartDateChange}
                        style={{ width: '150px' }}
                    />

                    {/* End Date */}
                    <input
                        type="date"
                        className="form-control"
                        value={endDate}
                        onChange={handleEndDateChange}
                        style={{ width: '150px' }}
                    />
                </div>
            </div>

            {loading ? (
                <p>Loading invoices...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>InvoiceID</th>
                                <th>CustName</th>
                                <th>BranchID</th>
                                <th>
                                    InvoiceDate{' '}
                                    <button
                                        onClick={handleSort}
                                        className="btn btn-link p-0"
                                    >
                                        {sortDirection === 0 ? '↑' : '↓'}
                                    </button>
                                </th>
                                <th>ShippingCost</th>
                                <th>Subtotal</th>
                                <th>TaxRate</th>
                                <th>DiscountRate</th>
                                <th>CouponID</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.invoiceId}>
                                    <td>{invoice.invoiceId}</td>
                                    <td>{invoice.custName}</td>
                                    <td>{invoice.branchId}</td>
                                    <td>
                                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                                    </td>
                                    <td>{invoice.shippingCost.toLocaleString()}</td>
                                    <td>{invoice.subtotal.toLocaleString()}</td>
                                    <td>{(invoice.taxRate * 100).toFixed(2)}%</td>
                                    <td>{invoice.discountRate}%</td>
                                    <td>{invoice.couponId}</td>
                                    <td>{invoice.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default InvoiceManagement;
