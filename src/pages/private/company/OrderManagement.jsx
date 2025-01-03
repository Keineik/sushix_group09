import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '../../../components/Pagination';
import { fetchOrders, fetchDineInOrder, fetchDeliveryOrder } from '../../../api/order';
import { fetchBranches } from '../../../api/branch';

const OrderManagement = ({ OrderType }) => {
    const [activeStatus, setActiveStatus] = useState('COMPLETED');
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'OrderDateTime', direction: 'desc' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 18;

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const branchesResponse = await fetchBranches();
                setBranches(branchesResponse || []);
            } catch (error) {
                console.error('Failed to fetch branches:', error);
            }
        };

        loadBranches();
    }, []);

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderType = OrderType === 'Dine-In' ? 'I' : (OrderType === 'Delivery' ? 'D' : '');
                const result = await fetchOrders({
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    searchTerm,
                    orderStatus: activeStatus,
                    orderType: orderType,
                    branchId: selectedBranch === 'all' ? null : selectedBranch,
                    sortDirection: true,
                });

                console.log("Result", result)

                setOrders(result.items || []);
                setTotalCount(result.totalCount || 0);
            } catch (err) {
                setError('Failed to fetch orders. Please try again.');
                console.error('Error loading orders:', err);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [currentPage, searchTerm, activeStatus, OrderType, selectedBranch]);

    useEffect(() => {
        const loadOrderDetails = async () => {
            if (selectedOrder) {
                setLoading(true);
                setError(null);
                try {
                    let result;
                    if (selectedOrder.orderType === 'Dine-In') {
                        result = await fetchDineInOrder(selectedOrder.orderId);

                    } else if (selectedOrder.orderType === 'Delivery') {
                        result = await fetchDeliveryOrder(selectedOrder.orderId);
                    }
                    console.log("Details: ", result)
                    setOrderDetails(result.orderDetails);
                } catch (err) {
                    setError('Failed to fetch order details. Please try again.');
                    console.error('Error loading order details:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadOrderDetails();
    }, [selectedOrder]);

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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };


    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{OrderType} Orders </h2>
            </div>

            <ul className="nav nav-tabs mt-3">
                {OrderType === 'Dine-In' ? (
                    <>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'COMPLETED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('COMPLETED')}
                            >
                                Completed
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'CANCELLED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('CANCELLED')}
                            >
                                Cancelled
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'UNVERIFIED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('UNVERIFIED')}
                            >
                                Unverified
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'VERIFIED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('VERIFIED')}
                            >
                                Verified
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'DELIVERED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('DELIVERED')}
                            >
                                Delivered
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'COMPLETED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('COMPLETED')}
                            >
                                Completed
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'VERIFIED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('VERIFIED')}
                            >
                                Verified
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'UNVERIFIED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('UNVERIFIED')}
                            >
                                Unverified
                            </button>
                        </li>
                    </>
                )}
            </ul>

            <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                <input
                    type="text"
                    placeholder="Search by Order ID, Name, Phone Number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control w-25"
                />
                <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="form-select w-25"
                >
                    <option value="all">All Branches</option>
                    {branches.map(branch => (
                        <option key={branch.branchId} value={branch.branchId}>{branch.branchName}</option>
                    ))}
                </select>
            </div>

            {loading && <div className="text-center my-4">Loading orders...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    Order ID
                                </th>
                                <th>
                                    Order Date
                                </th>
                                <th>
                                    Customer Name
                                </th>
                                <th>
                                    Customer Phone Number
                                </th>
                                <th>Subtotal</th>
                                {/* {OrderType === 'Dine-In' && (
                                        <th onClick={() => handleSort('TableID')}>
                                            Table
                                            {sortConfig.key === 'TableID' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                        </th>
                                    )} */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{new Date(order.orderDateTime).toLocaleString()}</td>
                                    <td>{order.custName}</td>
                                    <td>{order.custPhoneNumber}</td>
                                    <td>{formatPrice(order.estimatedPrice)}</td>
                                    {/* {OrderType === 'Dine-In' && <td>{order.TableID}</td>} */}
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleViewOrder(order)}
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger ms-2"
                                            onClick={() => handleDeleteOrder(order.orderId)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error &&
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
                    onPageChange={handlePageChange}
                />
            }

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
                                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                                <p><strong>Order Type:</strong> {selectedOrder.orderType}</p>
                                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDateTime).toLocaleString()}</p>
                                {/* {selectedOrder.OrderType === 'Dine-In' && selectedOrder.TableID && (
                                    <p><strong>Table ID:</strong> {selectedOrder.TableID}</p>
                                )} */}
                                <p><strong>Status:</strong> {activeStatus}</p>
                                {/* <p><strong>Staff ID:</strong> {selectedOrder.StaffID}</p> */}
                                <p><strong>Customer Name:</strong> {selectedOrder.custName}</p>
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
                                                    .filter(detail => detail.orderID === selectedOrder.orderID)
                                                    .map((detail) => (
                                                        <tr key={detail.itemId}>
                                                            <td>{detail.itemId}</td>
                                                            <td>{detail.unitPrice.toLocaleString()} VND</td>
                                                            <td>{detail.quantity}</td>
                                                            <td>
                                                                {(detail.unitPrice * detail.quantity).toLocaleString()} VND
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