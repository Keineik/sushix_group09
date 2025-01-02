import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { createDineInOrder, updateDineInOrder } from '../../../api/staffwork'; 
import { fetchMenuItems } from '../../../api/menuItem'; 
import { getAllRestaurantTables } from '../../../api/staffwork'; 
import { fetchDineInOrder } from '../../../api/order'; 
import { AuthContext } from '../../../context/AuthContext';


const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [availableItems, setAvailableItems] = useState([]);
  const { user } = useContext(AuthContext);
  const branchId = user.staff.department.branch.branchId;

  const [restaurantTables, setRestaurantTables] = useState([1]);

  useEffect(() => {
      const fetchTables = async () => {
          try {
              const tables = await getAllRestaurantTables();
              setRestaurantTables(tables);
              // console.log("Wth:", tables)
          } catch (error) {
              console.error('Error fetching tables:', error);
          }
      };

      fetchTables();
  }, []);

  const [order, setOrder] = useState({
    OrderDateTime: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 16),
    custId: '',
    StaffID: user.staff.staffId,
    tableCode: '',
    OrderStatus: 'UNVERIFIED', 
    Notes: '',
  });

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ itemId: '', unitPrice: 0, quantity: 1 });

  useEffect(() => {
    if (isEdit) {
      const fetchOrderData = async () => {
        try {
          const orderData = await fetchDineInOrder(id); 
          console.log("Orderdata: ", orderData)
          setOrder({
            ...orderData, 
            ...orderData.order,
          });
          setItems(orderData.orderDetails);
        } catch (error) {
          console.error('Error fetching dine-in order to update:', error);
        }
      };

      fetchOrderData();
    }
  }, [id, isEdit]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const menuItems = await fetchMenuItems({
          branchId: branchId,
          limit: 180 // bruh
        });
        console.log("R: ", menuItems)
        setAvailableItems(menuItems.items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchItems();
  }, [branchId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dineInOrderRequest = {
      custId: order.custId,
      tableCode: order.tableCode,

      orderDetails: items.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }))
    };
    console.log ("dineInOrderRequest:", dineInOrderRequest)

    try {
      if (isEdit) {
        console.log('Updating Order:', dineInOrderRequest);
        updateDineInOrder(id,dineInOrderRequest)
        navigate('/admin/branch/orders/dine-in');
      } else {
        console.log('Adding New Dine-In Order:', dineInOrderRequest);
        await createDineInOrder(dineInOrderRequest);
        navigate('/admin/branch/orders/dine-in');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleCancel = () => navigate('/admin/branch/orders/dine-in');

  const handleAddItem = () => {
    if (newItem.itemId && newItem.unitPrice && newItem.quantity) {
      setItems([...items, { ...newItem }]);
      setNewItem({ itemId: '', unitPrice: 0, quantity: 1 });
    }
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.ItemID !== itemId));
  };

  const handleItemSelect = (e) => {
    const selectedItem = availableItems.find(item => item.itemId === parseInt(e.target.value));
  if (selectedItem) {
    setNewItem({
      itemId: selectedItem.itemId,
      unitPrice: selectedItem.unitPrice, 
      quantity: 1,
    });
  }
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
            value={order.custId}
            onChange={(e) => setOrder({ ...order, custId: e.target.value })}
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
          <select
              className="form-select"
              value={order.tableCode}
              onChange={(e) => setOrder({ ...order, tableCode: e.target.value })}
              required
          >
              <option value="">Select Table</option>
              {restaurantTables.map((table) => (
                  <option key={table.tableId} value={table.tableCode}>
                      { `Table ${table.tableCode}`} 
                  </option>
              ))}
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
                <td>{item.itemId}</td>
                <td>{item.unitPrice.toLocaleString()} VND</td>
                <td>{item.quantity}</td>
                <td>{(item.unitPrice * item.quantity).toLocaleString()} VND</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteItem(item.ItemID)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-3">
          <select
            className="form-select d-inline-block w-25 me-2"
            value={newItem.itemId}
            onChange={handleItemSelect}
          >
            <option value="">Select Item</option>
            {availableItems.map((item) => (
              <option key={item.itemId} value={item.itemId}>
                {item.itemName}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            className="form-control d-inline-block w-25 me-2"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
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