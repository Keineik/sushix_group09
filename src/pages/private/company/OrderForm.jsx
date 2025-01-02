import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { createDineInOrder } from '../../../api/staffwork'; 
import orderData from '../../../dummy/orders.json';
import orderDetailsData from '../../../dummy/orderdetails.json';
import itemsData from '../../../dummy/items.json';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [availableItems, setAvailableItems] = useState(itemsData);

  const [order, setOrder] = useState({
    OrderDateTime: new Date().toISOString().slice(0, 16),
    CustID: '',
    StaffID: '',
    TableCode: '',
    OrderStatus: 'UNVERIFIED', 
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
      }
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dineInOrderRequest = {
      custId: order.CustID,
      tableCode: order.TableCode,
      rsId: order.StaffID,
      orderDetails: items.map(item => ({
        ItemID: item.ItemID,
        UnitPrice: item.UnitPrice,
        OrderQuantity: item.OrderQuantity
      }))
    };

    try {
      if (isEdit) {
        console.log('Updating Order:', dineInOrderRequest);
        // Call update API if necessary
      } else {
        console.log('Adding New Dine-In Order:', dineInOrderRequest);
        await createDineInOrder(dineInOrderRequest);  // Pass the dine-in order request
        navigate('/admin/branch/orders');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleCancel = () => navigate('/admin/branch/orders');

  const handleAddItem = () => {
    if (newItem.ItemID && newItem.UnitPrice && newItem.OrderQuantity) {
      setItems([...items, { ...newItem }]);
      setNewItem({ ItemID: '', UnitPrice: 0, OrderQuantity: 1 });
    }
  };

  const handleDeleteItem = (itemID) => {
    setItems(items.filter((item) => item.ItemID !== itemID));
  };

  const handleItemSelect = (e) => {
    const selectedItem = availableItems.find(item => item.id === parseInt(e.target.value));
    setNewItem({ ItemID: selectedItem.id, UnitPrice: (parseFloat(selectedItem.price)).toLocaleString, OrderQuantity: 1 });
  };

  return (
    <div className="container-fluid py-4">
      <h2>{isEdit ? 'Edit Dine-In Order' : 'Add Dine-In Order'}</h2>
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
          <label>Table Code</label>
          <input
            type="text"
            className="form-control"
            value={order.TableCode}
            onChange={(e) => setOrder({ ...order, TableCode: e.target.value })}
            required
          />
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
                <td>{(item.UnitPrice).toLocaleString} VND</td>
                <td>{item.OrderQuantity}</td>
                <td>{(item.UnitPrice * item.OrderQuantity).toLocaleString} VND</td>
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