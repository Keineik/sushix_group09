import React, { useState, useEffect, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import orderData from '../../../dummy/orders.json';
import orderDetailsData from '../../../dummy/orderdetails.json'; 
import BranchMenu from './BranchMenu'; 

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders(orderData);
    setOrderDetails(orderDetailsData);
  }, []);

  // Memoize filtered orders for performance
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.OrderID.toString().includes(searchTerm) ||
        (order.CustID && order.CustID.toString().includes(searchTerm)) ||
        (order.StaffID && order.StaffID.toString().includes(searchTerm)) ||
        (order.BranchID && order.BranchID.toString().includes(searchTerm))
    );
  }, [searchTerm, orders]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const determineOrderType = (order) => {
    return order.TableID ? 'Dine-In' : 'Delivery';
  };

  const getOrderDetails = (orderID) => {
    return orderDetails.filter((detail) => detail.OrderID === orderID);
  };

  const handleDeleteOrder = (orderID) => {
    // Placeholder for delete functionality
    const updatedOrders = orders.filter(order => order.OrderID !== orderID);
    setOrders(updatedOrders);
    alert(`Order with ID ${orderID} has been deleted`);
  };
  

  return (
    <div className="container-fluid">
      <Outlet />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order</h2>
        <Link to="add" className="btn btn-primary">
          Add Order
        </Link>
      </div>
    

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Order ID, Staff ID, Cust ID, or Branch ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Type</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.OrderID}>
                  <td>{order.OrderID}</td>
                  <td>{determineOrderType(order)}</td>
                  <td>{order.OrderDateTime}</td>
                  <td>{order.DeliveryStatus || order.OrderStatus}</td>
                  <td>
                    {order.TableID
                      ? `Table: ${order.TableID}`
                      : `Address: ${order.DeliveryAddress}`}
                  </td>
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
                      Delete Order
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
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Order ID:</strong> {selectedOrder.OrderID}</p>
                <p><strong>Order Type:</strong> {determineOrderType(selectedOrder)}</p>
                <p><strong>Order Date:</strong> {selectedOrder.OrderDateTime}</p>
                {selectedOrder.TableID && (
                  <p><strong>Table ID:</strong> {selectedOrder.TableID}</p>
                )}
                {selectedOrder.DeliveryAddress && (
                  <>
                    <p><strong>Delivery Address:</strong> {selectedOrder.DeliveryAddress}</p>
                    <p><strong>Delivery Date:</strong> {selectedOrder.DeliveryDateTime}</p>
                    <p><strong>Delivery Status:</strong> {selectedOrder.DeliveryStatus}</p>
                  </>
                )}
                <p><strong>Status:</strong> {selectedOrder.DeliveryStatus || selectedOrder.OrderStatus}</p>
                <p><strong>Staff ID:</strong> {selectedOrder.StaffID}</p>
                <p><strong>Customer ID:</strong> {selectedOrder.CustID}</p>
                <p><strong>Branch ID:</strong> {selectedOrder.BranchID}</p>
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
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(null)}
                >
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

export default Order;