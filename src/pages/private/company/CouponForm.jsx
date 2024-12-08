import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import couponsData from '../../../dummy/promotions.json';

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    CouponCode: '',
    CouponDesc: '',
    DiscountFlat: '',
    DiscountRate: '',
    MinOrderValue: '',
    MaxDiscountValue: '',
    EffectiveDate: '',
    ExpiredDate: '',
    TotalUsageLimit: '',
    MinMembershipRequirement: ''
  });

  useEffect(() => {
    if (isEdit) {
      const coupon = couponsData.find(coupon => coupon.CouponID === parseInt(id));
      if (coupon) {
        setFormData(coupon);
      } else {
        console.error(`Coupon with ID ${id} not found.`);
        navigate('/admin/company/coupons');
      }
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Handle edit logic
      console.log('Editing coupon:', formData);
    } else {
      // Handle add logic
      console.log('Adding new coupon:', formData);
    }
    navigate('/admin/company/coupons');
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{isEdit ? 'Edit Coupon' : 'Add Coupon'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Coupon Code</label>
              <input
                type="text"
                className="form-control"
                value={formData.CouponCode}
                onChange={(e) => setFormData({ ...formData, CouponCode: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={formData.CouponDesc}
                onChange={(e) => setFormData({ ...formData, CouponDesc: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Discount Flat (VND)</label>
              <input
                type="number"
                className="form-control"
                value={formData.DiscountFlat}
                onChange={(e) => setFormData({ ...formData, DiscountFlat: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Discount Rate (%)</label>
              <input
                type="number"
                className="form-control"
                value={formData.DiscountRate}
                onChange={(e) => setFormData({ ...formData, DiscountRate: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Min Order Value (VND)</label>
              <input
                type="number"
                className="form-control"
                value={formData.MinOrderValue}
                onChange={(e) => setFormData({ ...formData, MinOrderValue: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Max Discount Value (VND)</label>
              <input
                type="number"
                className="form-control"
                value={formData.MaxDiscountValue}
                onChange={(e) => setFormData({ ...formData, MaxDiscountValue: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Effective Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.EffectiveDate}
                onChange={(e) => setFormData({ ...formData, EffectiveDate: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Expired Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.ExpiredDate}
                onChange={(e) => setFormData({ ...formData, ExpiredDate: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Total Usage Limit</label>
              <input
                type="number"
                className="form-control"
                value={formData.TotalUsageLimit}
                onChange={(e) => setFormData({ ...formData, TotalUsageLimit: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Min Membership Requirement</label>
              <input
                type="text"
                className="form-control"
                value={formData.MinMembershipRequirement}
                onChange={(e) => setFormData({ ...formData, MinMembershipRequirement: e.target.value })}
                required
              />
            </div>
            <div className="d-flex">
              <button type="submit" className="btn btn-success me-2">
                {isEdit ? 'Update Coupon' : 'Add Coupon'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/company/coupons')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
  );
};

export default CouponForm;