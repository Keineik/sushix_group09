import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { fetchOrders } from '../../../api/order';
import Pagination from '../../../components/Pagination';
import { createInvoice } from '../../../api/staffwork'; 

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
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
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
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedOrder(null);
    };

    const handleOpenInvoiceModal = (order) => {
        setSelectedOrder(order);
        setShowInvoiceModal(true);
    };

    const handleCloseInvoiceModal = () => {
        setShowInvoiceModal(false);
        setSelectedOrder(null);
    };

    const handlePayment = async () => {
    
    const couponCode = document.getElementById("couponCode").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const taxRate = parseFloat(document.getElementById("taxRate").value/ 100) || 0.08;

    const invoiceRequest = {
        orderId: selectedOrder.orderId,
        paymentMethod,
        taxRate,
        couponCode,
    };

    try {
        const invoice = await createInvoice(invoiceRequest);
        console.log("Invoice created successfully:", invoice);
        alert("Invoice created successfully!");
        handleCloseInvoiceModal();
    } catch (error) {
        console.error("Error creating invoice:", error);
        alert("Failed to create invoice. Please try again.");
    }
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
                                            {/* {console.log(order.orderStatus)} */}
                                            {OrderType === 'Dine-In' && order.orderStatus !== 'CANCELLED ' && order.orderStatus !== 'COMPLETED ' && (
                                            <button
                                                className="btn btn-sm btn-outline-success ms-2"
                                                onClick={() => handleOpenInvoiceModal(order)}
                                            >
                                                <i className="bi bi-printer"></i>
                                            </button>
                                            )}
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
        
            {showDetailsModal && selectedOrder && (
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
                                {selectedOrder.length > 0 && (
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
                                                {selectedOrder
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
                                <button className="btn btn-secondary" onClick={handleCloseDetailsModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showInvoiceModal && selectedOrder && (
                <div
                    className="modal show"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Invoice</h5>
                                <button className="btn-close" onClick={handleCloseInvoiceModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                                <p><strong>Estimated Price:</strong> {selectedOrder.estimatedPrice.toLocaleString() } đ</p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="couponCode" className="form-label">Coupon Code</label>
                                        <input
                                            type="text"
                                            id="couponCode"
                                            className="form-control"
                                            placeholder="Enter coupon code"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                                        <select id="paymentMethod" className="form-select">
                                            <option value="cash">Cash</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="paypal">PayPal</option>
                                            
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="taxRate" className="form-label">Tax Rate (%)</label>
                                        <input
                                            type="number"
                                            id="taxRate"
                                            defaultValue="8"
                                            className="form-control"
                                            placeholder="Enter tax rate"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handlePayment}> Create Invoice</button>
                                <button className="btn btn-secondary" onClick={handleCloseInvoiceModal}>
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