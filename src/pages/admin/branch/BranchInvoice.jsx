import React, { useState, useEffect } from 'react';
import invoiceData from '../../../dummy/invoice.json';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setInvoices(invoiceData);
  }, []);

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
                <th>Invoice Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.InvoiceID}>
                  <td>{invoice.InvoiceID}</td>
                  <td>{invoice.OrderID}</td>
                  <td>{invoice.CouponID || 'N/A'}</td>
                  <td>{(invoice.TaxRate * 100)}%</td>
                  <td>{invoice.ShippingCost.toLocaleString()} VND</td>
                  <td>{invoice.PaymentMethod}</td>
                  <td>{invoice.InvoiceDate}</td>
                  <td>{invoice.InvoiceStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;