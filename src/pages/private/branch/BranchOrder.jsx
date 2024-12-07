import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import orderData from '../../../dummy/orders.json';
import orderDetailsData from '../../../dummy/orderdetails.json';

const BranchOrder = ( {OrderType} ) => {
  const [activeStatus, setActiveStatus] = useState('Preparing');
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'OrderDateTime', direction: 'desc' });

  useEffect(() => {
    setOrders(orderData);
    setOrderDetails(orderDetailsData);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => order.OrderType === OrderType && order.OrderStatus === activeStatus)
      .filter(
        (order) =>
          order.OrderID.toString().includes(searchTerm) ||
          (order.CustID && order.CustID.toString().includes(searchTerm)) ||
          (order.StaffID && order.StaffID.toString().includes(searchTerm))
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [orders, OrderType, activeStatus, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const getOrderDetails = (orderID) => {
    return orderDetails.filter((detail) => detail.OrderID === orderID);
  };

  const handleDeleteOrder = (orderID) => {
    const updatedOrders = orders.filter(order => order.OrderID !== orderID);
    setOrders(updatedOrders);
    alert(`Order with ID ${orderID} has been deleted`);
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
        {OrderType === 'Dine-In' && (
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
        )}
        {OrderType === 'Delivery' && (
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
          placeholder="Search by Order ID, Staff ID, Cust ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
              {filteredOrders.map((order) => (
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
                    {getOrderDetails(selectedOrder.OrderID).map((detail) => (
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

export default BranchOrder;