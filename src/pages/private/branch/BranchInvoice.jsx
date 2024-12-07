import React, { useState, useEffect } from 'react';
import invoiceData from '../../../dummy/invoice.json';
import orderData from '../../../dummy/orders.json';
import orderdetails from '../../../dummy/orderdetails.json';
import promotions from '../../../dummy/promotions.json';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [promotionsData, setPromotionsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentOrder, setPaymentOrder] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    CouponID: '',
    TaxRate: 0.1,  
    ShippingCost: 30000, 
    PaymentMethod: '',
  });

  const paymentMethods = ['Credit Card', 'Cash', 'Bank Transfer', 'E-Wallet'];

  useEffect(() => {
    setInvoices(invoiceData);
    setOrders(orderData.filter((order) => order.OrderStatus === 'Served' || order.OrderStatus === 'Delivered'));
    setPromotionsData(promotions);
  }, []);

  const handlePayment = (order) => {
    setPaymentOrder(order);

    setPaymentForm((prevForm) => ({
      CouponID: '',
      TaxRate: 0.1, 
      ShippingCost: order.OrderType === 'Delivery' ? 30000 : 0, 
      PaymentMethod: '',
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'ShippingCost' && paymentOrder.OrderType === 'Dine-in') {
      return;
    }

    setPaymentForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const calculateTotal = (orderID) => {
    const details = orderdetails.filter(item => item.OrderID === orderID);

    if (!details.length) return 0;

    return details.reduce((total, item) => {
      const price = item.UnitPrice || 0;
      const quantity = item.OrderQuantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const calculateDiscount = (totalAmount, coupon) => {
    if (!coupon) return 0;

    let discount = 0;
    const orderTotal = totalAmount;

    if (coupon.DiscountRate) {
      if (orderTotal >= coupon.MinOrderValue) {
        discount = (orderTotal * coupon.DiscountRate) / 100;
        if (coupon.MaxDiscountValue) {
          discount = Math.min(discount, coupon.MaxDiscountValue);
        }
      }
    } else if (coupon.DiscountFlat) {
      if (orderTotal >= coupon.MinOrderValue) {
        discount = coupon.DiscountFlat;
      }
    }

    return discount;
  };

  const handleSubmitPayment = () => {
    if (!paymentOrder) {
      alert('No order selected!');
      return;
    }

    const orderTotal = calculateTotal(paymentOrder.OrderID); // Using orderID to calculate total
    if (orderTotal === 0) {
      alert('Invalid order details. Total cannot be calculated.');
      return;
    }

    const selectedPromotion = promotionsData.find(
      (promo) => promo.CouponID === parseInt(paymentForm.CouponID)
    );
    const discountAmount = calculateDiscount(orderTotal, selectedPromotion);
    const totalAfterDiscount = orderTotal - discountAmount;
    const taxAmount = totalAfterDiscount * paymentForm.TaxRate;
    const finalTotal = totalAfterDiscount + taxAmount + paymentForm.ShippingCost;

    const newInvoice = {
      InvoiceID: invoices.length + 1,
      OrderID: paymentOrder.OrderID,
      CouponID: paymentForm.CouponID || null,
      TaxRate: parseFloat(paymentForm.TaxRate) || 0,
      ShippingCost: parseFloat(paymentForm.ShippingCost) || 0,
      PaymentMethod: paymentForm.PaymentMethod,
      InvoiceDate: new Date().toLocaleString(),
      InvoiceStatus: 'Paid',
      Total: finalTotal,
      Discount: discountAmount,
    };

    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.OrderID === paymentOrder.OrderID
          ? { ...order, OrderStatus: 'Paid' }
          : order
      )
    );

    setPaymentOrder(null);
    alert(`Payment for Order ${paymentOrder.OrderID} has been completed.`);
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.InvoiceID.toString().includes(searchTerm) ||
      invoice.OrderID.toString().includes(searchTerm)
  );

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Invoice Management</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Invoice ID or Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h3>Pending Payments</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Type</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.OrderID}>
                  <td>{order.OrderID}</td>
                  <td>{order.OrderType}</td>
                  <td>{new Date(order.OrderDateTime).toLocaleString()}</td>
                  <td>{order.OrderStatus}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handlePayment(order)}
                    >
                      Settle Bill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Order ID</th>
                <th>Coupon ID</th>
                <th>Tax Rate</th>
                <th>Shipping Cost</th>
                <th>Payment Method</th>
                <th>Total</th>
                <th>Discount</th>
                <th>Invoice Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.InvoiceID}>
                  <td>{invoice.InvoiceID}</td>
                  <td>{invoice.OrderID}</td>
                  <td>{invoice.CouponID || 'None'}</td>
                  <td>{(invoice.TaxRate * 100).toFixed(2)}%</td>
                  <td>{invoice.ShippingCost ? invoice.ShippingCost.toLocaleString() : '0'} VND</td>
                  <td>{invoice.PaymentMethod}</td>
                  <td>{invoice.Total ? invoice.Total.toLocaleString() : '0'} VND</td>
                  <td>{invoice.Discount ? invoice.Discount.toLocaleString() : '0'} VND</td>
                  <td>{invoice.InvoiceDate}</td>
                  <td>{invoice.InvoiceStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {paymentOrder && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Payment for Order {paymentOrder.OrderID}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setPaymentOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Coupon</label>
                  <select
                    className="form-select"
                    name="CouponID"
                    value={paymentForm.CouponID}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a Coupon</option>
                    {promotionsData.map((promo) => (
                      <option key={promo.CouponID} value={promo.CouponID}>
                        {promo.CouponCode} - {promo.CouponDesc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tax Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    name="TaxRate"
                    value={paymentForm.TaxRate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Shipping Cost (VND)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="ShippingCost"
                    value={paymentForm.ShippingCost}
                    onChange={handleFormChange}
                    disabled={paymentOrder.OrderType === 'Dine-in'}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    name="PaymentMethod"
                    value={paymentForm.PaymentMethod}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a Payment Method</option>
                    {paymentMethods.map((method, index) => (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPaymentOrder(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitPayment}
                >
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;