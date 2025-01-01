import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../../api/order';

const OrderManagement = ({ OrderType }) => {
    const [activeStatus, setActiveStatus] = useState('Preparing');
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'OrderDateTime', direction: 'desc' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 18;

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchOrders({
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    searchTerm,
                    orderStatus: activeStatus,
                    orderType: OrderType,
                    sortKey: sortConfig.key,
                    sortDirection: sortConfig.direction === 'desc' ? 1 : 0,
                });

                setOrders(result.orders || []);
                setTotalPages(Math.ceil((result.total || 0) / ITEMS_PER_PAGE));
            } catch (err) {
                setError('Failed to fetch orders. Please try again.');
                console.error('Error loading orders:', err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [currentPage, searchTerm, activeStatus, OrderType, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page when sorting changes
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleDeleteOrder = async (orderID) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                // Implement delete API call here
                const updatedOrders = orders.filter(order => order.OrderID !== orderID);
                setOrders(updatedOrders);
                alert(`Order with ID ${orderID} has been deleted`);
            } catch (err) {
                alert('Failed to delete order. Please try again.');
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        return (
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{OrderType} Orders - {activeStatus}</h2>
                <Link to="add" className="btn btn-primary">
                    Add Order
                </Link>
            </div>

            <ul className="nav nav-tabs mt-3">
                {OrderType === 'Dine-In' ? (
                    <>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Preparing' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Preparing')}
                            >
                                Preparing
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Served' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Served')}
                            >
                                Served
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Completed' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Completed')}
                            >
                                Completed
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Cancelled' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Cancelled')}
                            >
                                Cancelled
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Ordered' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Ordered')}
                            >
                                Ordered
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Preparing' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Preparing')}
                            >
                                Preparing
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Out for Delivery' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Out for Delivery')}
                            >
                                Out for Delivery
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Delivered' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Delivered')}
                            >
                                Delivered
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Completed' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Completed')}
                            >
                                Completed
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'Cancelled' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('Cancelled')}
                            >
                                Cancelled
                            </button>
                        </li>
                    </>
                )}
            </ul>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Order ID, Staff ID, Customer ID..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page when search term changes
                    }}
                />
            </div>

            {loading && <div className="text-center my-4">Loading orders...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('OrderID')}>
                                        Order ID
                                        {sortConfig.key === 'OrderID' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('OrderDateTime')}>
                                        Order Date
                                        {sortConfig.key === 'OrderDateTime' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th onClick={() => handleSort('CustID')}>
                                        Customer ID
                                        {sortConfig.key === 'CustID' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                    <th>Status</th>
                                    {OrderType === 'Dine-In' && (
                                        <th onClick={() => handleSort('TableID')}>
                                            Table
                                            {sortConfig.key === 'TableID' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                    )}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.OrderID}>
                                        <td>{order.OrderID}</td>
                                        <td>{new Date(order.OrderDateTime).toLocaleString()}</td>
                                        <td>{order.CustID}</td>
                                        <td>{order.OrderStatus}</td>
                                        {OrderType === 'Dine-In' && <td>{order.TableID}</td>}
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                                View Details
                                            </button>
                                            <Link
                                                to={`edit/${order.OrderID}`}
                                                className="btn btn-sm btn-outline-secondary ms-2"
                                            >
                                                Edit Order
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => handleDeleteOrder(order.OrderID)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {!loading && !error && renderPagination()}

            {selectedOrder && (
                <div
                    className="modal show"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details</h5>
                                <button className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Order ID:</strong> {selectedOrder.OrderID}</p>
                                <p><strong>Order Type:</strong> {selectedOrder.OrderType}</p>
                                <p><strong>Order Date:</strong> {new Date(selectedOrder.OrderDateTime).toLocaleString()}</p>
                                {selectedOrder.OrderType === 'Dine-In' && selectedOrder.TableID && (
                                    <p><strong>Table ID:</strong> {selectedOrder.TableID}</p>
                                )}
                                {selectedOrder.OrderType === 'Dine-In' && selectedOrder.RsID && (
                                    <>
                                        <p><strong>Reservation ID:</strong> {selectedOrder.RsID}</p>
                                        <p><strong>Arrival Time:</strong> {new Date(selectedOrder.ArrivalDateTime).toLocaleString()}</p>
                                        <p><strong>Number of Guests:</strong> {selectedOrder.NumOfGuests}</p>
                                        <p><strong>Special Notes:</strong> {selectedOrder.RsNotes}</p>
                                    </>
                                )}
                                <p><strong>Status:</strong> {selectedOrder.OrderStatus}</p>
                                <p><strong>Staff ID:</strong> {selectedOrder.StaffID}</p>
                                <p><strong>Customer ID:</strong> {selectedOrder.CustID}</p>
                                {orderDetails.length > 0 && (
                                    <>
                                        <hr />
                                        <h5>Items in this Order</h5>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Item ID</th>
                                                    <th>Unit Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetails
                                                    .filter(detail => detail.OrderID === selectedOrder.OrderID)
                                                    .map((detail) => (
                                                        <tr key={detail.ItemID}>
                                                            <td>{detail.ItemID}</td>
                                                            <td>{detail.UnitPrice.toLocaleString()} VND</td>
                                                            <td>{detail.OrderQuantity}</td>
                                                            <td>
                                                                {(detail.UnitPrice * detail.OrderQuantity).toLocaleString()} VND
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;