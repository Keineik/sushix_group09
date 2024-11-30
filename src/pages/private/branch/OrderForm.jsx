import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import orderData from '../../../dummy/orders.json';
import orderDetailsData from '../../../dummy/orderdetails.json';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

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
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...order, OrderID: isEdit ? order.OrderID : Date.now() }; // Generate new ID for new orders
    if (isEdit) {
      console.log('Updating Order:', { order: newOrder, items });
    } else {
      console.log('Adding New Order:', { order: newOrder, items });
    }
    navigate('/admin/branch/orders');
  };

  const handleCancel = (e) => {
    navigate('/admin/branch/orders');
  };

  const handleAddItem = () => {
    if (newItem.ItemID && newItem.UnitPrice && newItem.OrderQuantity) {
      setItems([...items, { ...newItem, OrderID: order.OrderID || Date.now() }]);
      setNewItem({ ItemID: '', UnitPrice: 0, OrderQuantity: 1 });
    }
  };

  const handleDeleteItem = (itemID) => {
    setItems(items.filter((item) => item.ItemID !== itemID));
  };

  return (
    <div className="container-fluid py-4">
      <h2>{isEdit ? 'Edit Order' : 'Add Order'}</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label>Branch ID</label>
          <input
            type="text"
            className="form-control"
            value={order.BranchID}
            onChange={(e) => setOrder({ ...order, BranchID: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Order Status</label>
          <select
            className="form-select"
            value={order.OrderStatus}
            onChange={(e) => setOrder({ ...order, OrderStatus: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
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
                <td>{item.UnitPrice.toLocaleString()} VND</td>
                <td>{item.OrderQuantity}</td>
                <td>{(item.UnitPrice * item.OrderQuantity).toLocaleString()} VND</td>
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
        <div className="mb-3">
          <input
            type="text"
            placeholder="Item ID"
            className="form-control d-inline-block w-25 me-2"
            value={newItem.ItemID}
            onChange={(e) => setNewItem({ ...newItem, ItemID: e.target.value })}
          />
          <input
            type="number"
            placeholder="Unit Price"
            className="form-control d-inline-block w-25 me-2"
            value={newItem.UnitPrice}
            onChange={(e) => setNewItem({ ...newItem, UnitPrice: parseFloat(e.target.value) })}
          />
          
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
