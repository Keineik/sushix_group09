import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import couponsData from '../../../dummy/promotions.json';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch coupons from the API or use dummy data
    // const fetchCoupons = async () => {
    //   const response = await axios.get('/api/coupons');
    //   setCoupons(response.data);
    // };
    // fetchCoupons();
    setCoupons(couponsData);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    // await axios.delete(`/api/coupons/${id}`);
    setCoupons(coupons.filter(coupon => coupon.CouponID !== id));
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.CouponCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Coupon Management</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Search by code..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-25"
        />
        <Link to="add" className="btn btn-danger">Add New Coupon</Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Description</th>
            <th>Discount</th>
            <th>Min Order Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map(coupon => (
            <tr key={coupon.CouponID}>
              <td>{coupon.CouponID}</td>
              <td>{coupon.CouponCode}</td>
              <td>{coupon.CouponDesc}</td>
              <td>
                {coupon.DiscountFlat
                  ? `${coupon.DiscountFlat.toLocaleString()} VND`
                  : `${coupon.DiscountRate}%`}
              </td>
              <td>{coupon.MinOrderValue.toLocaleString()} VND</td>
              <td>
                <Link to={`edit/${coupon.CouponID}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                <button onClick={() => handleDelete(coupon.CouponID)} className="btn btn-sm btn-outline-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponManagement;