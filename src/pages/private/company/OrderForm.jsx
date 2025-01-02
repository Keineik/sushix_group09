import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import orderData from '../../../dummy/orders.json';
import orderDetailsData from '../../../dummy/orderdetails.json';
import itemsData from '../../../dummy/items.json';

const formatCurrency = (value) => {
  const numericValue = Number(value);
  if (isNaN(numericValue)) return value; 
  return numericValue.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
};

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [availableItems, setAvailableItems] = useState(itemsData); 

  const [orderType, setOrderType] = useState('Dine-In');
  const [isReservation, setIsReservation] = useState(false); 
  const [orderStatus, setOrderStatus] = useState('Pending'); 
  const [order, setOrder] = useState({
    OrderID: '',
    OrderDateTime: new Date().toISOString().slice(0, 16),
    CustID: '',
    StaffID: '',
    BranchID: '',
    OrderStatus: 'Pending', 
    TableID: '',
    DeliveryAddress: '',
    DeliveryDateTime: '',
    DeliveryStatus: '',
    NumOfGuests: '',
    ArrivalDateTime: '',
    Notes: '',
  });

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ ItemID: '', UnitPrice: 0, OrderQuantity: 1 });

  useEffect(() => {
    if (isEdit) {
      const selectedOrder = orderData.find((o) => o.OrderID === parseInt(id));
      const orderItems = orderDetailsData.filter((item) => item.OrderID === parseInt(id));
      if (selectedOrder) {
        setOrder(selectedOrder);
        setItems(orderItems);
        setOrderType(selectedOrder.TableID ? 'Dine-In' : selectedOrder.DeliveryAddress ? 'Delivery' : 'Dine-In');
        setOrderStatus(selectedOrder.OrderStatus || 'Pending');
        setIsReservation(selectedOrder.TableID === null && selectedOrder.DeliveryAddress === null);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      ...order,
      OrderID: isEdit ? order.OrderID : Date.now(),
      OrderType: orderType,
      OrderStatus: orderStatus,
    };

    if (isEdit) {
      console.log('Updating Order:', { order: newOrder, items });
    } else {
      console.log('Adding New Order:', { order: newOrder, items });
    }
    navigate('/admin/branch/orders');
  };

  const handleCancel = () => navigate('/admin/orders');

  const handleAddItem = () => {
    if (newItem.ItemID && newItem.UnitPrice && newItem.OrderQuantity) {
      setItems([...items, { ...newItem, OrderID: order.OrderID || Date.now() }]);
      setNewItem({ ItemID: '', UnitPrice: 0, OrderQuantity: 1 });
    }
  };

  const handleDeleteItem = (itemID) => {
    setItems(items.filter((item) => item.ItemID !== itemID));
  };

    const handleItemSelect = (e) => {
    const selectedItem = availableItems.find(item => item.id === parseInt(e.target.value));
    setNewItem({ ItemID: selectedItem.id, UnitPrice: formatCurrency(parseFloat(selectedItem.price)), OrderQuantity: 1 });
  };

  return (
    <div className="container-fluid py-4">
      <h2>{isEdit ? 'Edit Order' : 'Add Order'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Order Type</label>
          <select
            className="form-select"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            disabled={isReservation}
          >
            <option value="Dine-In">Dine-In</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        {orderType !== 'Delivery' && ( 
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isReservation}
              onChange={() => setIsReservation(!isReservation)}
            />
            <label className="form-check-label">Reservation</label>
          </div>
        )}

        <div className="mb-3">
          <label>Order Date</label>
          <input
            type="datetime-local"
            className="form-control"
            value={order.OrderDateTime}
            onChange={(e) => setOrder({ ...order, OrderDateTime: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Customer ID</label>
          <input
            type="text"
            className="form-control"
            value={order.CustID}
            onChange={(e) => setOrder({ ...order, CustID: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Staff ID</label>
          <input
            type="text"
            className="form-control"
            value={order.StaffID}
            onChange={(e) => setOrder({ ...order, StaffID: e.target.value })}
            required
          />
        </div>

        {(orderType === 'Dine-In' || isReservation) && (
          <div className="mb-3">
            <label>Table ID</label>
            <input
              type="text"
              className="form-control"
              value={order.TableID}
              onChange={(e) => setOrder({ ...order, TableID: e.target.value })}
              required
            />
          </div>
        )}

        {/* Show Delivery fields if the order type is Delivery */}
        {orderType === 'Delivery' && (
          <>
            <div className="mb-3">
              <label>Delivery Address</label>
              <input
                type="text"
                className="form-control"
                value={order.DeliveryAddress}
                onChange={(e) => setOrder({ ...order, DeliveryAddress: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Delivery Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={order.DeliveryDateTime}
                onChange={(e) => setOrder({ ...order, DeliveryDateTime: e.target.value })}
                required
              />
            </div>
          </>
        )}

        {/* Show reservation fields if isReservation is true */}
        {isReservation && (
          <>
            <div className="mb-3">
              <label>Number of Guests</label>
              <input
                type="number"
                className="form-control"
                value={order.NumOfGuests}
                onChange={(e) => setOrder({ ...order, NumOfGuests: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Arrival Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={order.ArrivalDateTime}
                onChange={(e) => setOrder({ ...order, ArrivalDateTime: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label>Notes</label>
              <textarea
                className="form-control"
                value={order.Notes}
                onChange={(e) => setOrder({ ...order, Notes: e.target.value })}
              />
            </div>
          </>
        )}


        {/* Order Status Dropdown */}
        <div className="mb-3">
          <label>Order Status</label>
          <select
            className="form-select"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <h5>Order Items</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.ItemID}</td>
                <td>{formatCurrency(item.UnitPrice.toLocaleString())} VND</td>
                <td>{item.OrderQuantity}</td>
                <td>{formatCurrency((item.UnitPrice * item.OrderQuantity).toLocaleString())} VND</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteItem(item.ItemID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add Item Section */}
        <div className="mb-3">
          <select
            className="form-select d-inline-block w-25 me-2"
            value={newItem.ItemID}
            onChange={handleItemSelect}
          >
            <option value="">Select Item</option>
            {availableItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            className="form-control d-inline-block w-25 me-2"
            value={newItem.OrderQuantity}
            onChange={(e) => setNewItem({ ...newItem, OrderQuantity: parseInt(e.target.value) })}
          />
          <button type="button" className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
        </div>

        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            {isEdit ? 'Update Order' : 'Add Order'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;