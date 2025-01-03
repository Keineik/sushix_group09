import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCoupons } from '../../../api/coupon';
import { fetchCardTypes } from '../../../api/cardType';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardTypes, setCardTypes] = useState([]);

  const loadCardTypes = async () => {
    try {
        const cardTypesResponse = await fetchCardTypes();
        setCardTypes(cardTypesResponse || []);
    } catch (err) {
        console.error("Failed to fetch card types.");
    }
  };

  const loadCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const couponsResponse = await fetchCoupons();
      setCoupons(couponsResponse || []);
      console.log("couponsResponse: ",couponsResponse )
    } catch (err) {
      setError("Failed to fetch coupons.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      loadCoupons();
      loadCardTypes();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    setCoupons(coupons.filter(coupon => coupon.couponId !== id));
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCardName = (cardTypeId) => {
    const card = cardTypes.find((ct) => ct.cardTypeId === cardTypeId);
    return card ? card.cardName : 'Unknown';
  };

  return (
    <div>
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
            <th>Usage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map(coupon => (
            <tr key={coupon.couponId}>
              <td>{coupon.couponId}</td>
              <td>{coupon.couponCode}</td>
              <td>{coupon.couponDesc}</td>
              <td>
                {coupon.discountFlat ? `${coupon.discountFlat} VND` : ''}
                {coupon.discountRate ? ` ${coupon.discountRate*100}%` : ''}
              </td>
              <td>{coupon.remainingUsage}/{coupon.totalUsageLimit}</td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedCoupon(coupon)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <Link to={`edit/${coupon.couponId}`} className="btn btn-sm btn-outline-secondary me-2">
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(coupon.couponId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCoupon && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Coupon Details</h5>
                <button className="btn-close" onClick={() => setSelectedCoupon(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedCoupon.couponId}</p>
                <p><strong>Code:</strong> {selectedCoupon.couponCode}</p>
                <p><strong>Description:</strong> {selectedCoupon.couponDesc}</p>
                <p><strong>Discount Flat:</strong> {selectedCoupon.discountFlat}</p>
                <p><strong>Discount Rate:</strong> {selectedCoupon.discountRate}</p>
                <p><strong>Minimum Purchase:</strong> {selectedCoupon.minPurchase}</p>
                <p><strong>Maximum Discount:</strong> {selectedCoupon.maxDiscount}</p>
                <p><strong>Effective Date:</strong> {selectedCoupon.effectiveDate}</p>
                <p><strong>Expiry Date:</strong> {selectedCoupon.expiryDate}</p>
                <p><strong>Total Usage Limit:</strong> {selectedCoupon.totalUsageLimit}</p>
                <p><strong>Remaining Usage:</strong> {selectedCoupon.remainingUsage}</p>
                <p><strong>Minimum Membership Requirement:</strong> {getCardName(selectedCoupon.minMembershipRequirement)}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedCoupon(null)}>
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

export default CouponManagement;