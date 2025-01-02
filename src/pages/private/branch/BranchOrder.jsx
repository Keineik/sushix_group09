import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { fetchOrders } from '../../../api/order';
import Pagination from '../../../components/Pagination';

const OrderManagement = ({ OrderType }) => {
    const { user } = useContext(AuthContext);
    const branchId = user.staff.department.branch.branchId;
    const [activeStatus, setActiveStatus] = useState('COMPLETED');
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'OrderDateTime', direction: 'desc' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 18;

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
                    branchId: branchId,                
                    orderStatus: activeStatus,
                    orderType: orderType,
                    sortDirection: sortConfig.direction === 'desc' ? 1 : 0,
                });

                console.log ("Result",result)

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
    }, [currentPage, searchTerm, branchId, activeStatus, OrderType, sortConfig]);

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


    return (
        <div className="container-fluid">
          {/* <div>
                <p>Current Branch ID: {branchId}</p>  
            </div> */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{OrderType} Orders </h2>
                <Link to="add" className="btn btn-primary">
                    Add Order
                </Link>
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

                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeStatus === 'CANCELLED' ? 'active' : ''}`}
                                onClick={() => setActiveStatus('CANCELLED')}
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
                                        <td>{order.custId}</td>
                                        <td>{order.orderStatus}</td>
                                        {/* {OrderType === 'Dine-In' && <td>{order.TableID}</td>} */}
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => handleViewOrder(order)}
                                            >
                                               <i className="bi bi-eye"></i>
                                            </button>
                                            {OrderType !== 'Delivery' && (
                                                <Link
                                                    to={`edit/${order.orderId}`}
                                                    className="btn btn-sm btn-outline-secondary ms-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                            )}
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
                                {/* <p><strong>Branch</strong> {selectedOrder.branchId}</p> */}
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
                                                // idk
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