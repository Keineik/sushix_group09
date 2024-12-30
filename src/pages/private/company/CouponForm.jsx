//T code dơ quá, m sửa lại đi :), j noo ok maf
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCoupon, createCoupon, getCoupon } from '../../../api/coupon';
import { fetchCardTypes } from '../../../api/cardType';

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    couponCode: '',
    couponDesc: '',
    discountFlat: null,
    discountRate: null,
    minPurchase: null,
    maxDiscount: null,
    effectiveDate: '',
    expiryDate: '',
    totalUsageLimit: null,
    minMembershipRequirement: null
  });

  const [cardTypes, setCardTypes] = useState([]);

  const fetchData = async () => {
    try {
      const cardTypesResponse = await fetchCardTypes();
      setCardTypes(cardTypesResponse || []);

      if (isEdit) {
        const couponResponse = await getCoupon(id);
        setFormData(couponResponse);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      discountFlat: formData.discountFlat === '0' ? null : parseFloat(formData.discountFlat),
      discountRate: formData.discountRate === '0' ? null : parseFloat(formData.discountRate/100.0),
      minPurchase: formData.minPurchase === 0 ? null : parseFloat(formData.minPurchase),
      maxDiscount: formData.maxDiscount === 0 ? null : parseFloat(formData.maxDiscount),
      totalUsageLimit: formData.totalUsageLimit === 0 ? null : parseInt(formData.totalUsageLimit, 10),
      minMembershipRequirement: formData.minMembershipRequirement === '' ? null : parseInt(formData.minMembershipRequirement, 10),
    };
    try {
      if (isEdit) {
        await updateCoupon(id, updatedFormData);
      } else {
        await createCoupon(updatedFormData);
      }
      navigate('/admin/company/coupon');
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value === '' ? null : value
    }));
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
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            name="couponDesc"
            value={formData.couponDesc}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discount Flat (VND)</label>
          <input
            type="number"
            step="any"
            min={0}
            className="form-control"
            name="discountFlat"
            value={formData.discountFlat || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discount Rate (%)</label>
          <input
            type="number"
            step="any"
            min={0}
            max={100}
            className="form-control"
            name="discountRate"
            value={formData.discountRate || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Minimum Purchase (VND)</label>
          <input
            type="number"
            step="any"
            min={0}
            className="form-control"
            name="minPurchase"
            value={formData.minPurchase || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Maximum Discount (VND)</label>
          <input
            type="number"
            step="any"
            min={0}
            className="form-control"
            name="maxDiscount"
            value={formData.maxDiscount || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Effective Date</label>
          <input
            type="date"
            className="form-control"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            className="form-control"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Usage Limit</label>
          <input
            type="number"
            step="any"
            min={0}
            className="form-control"
            name="totalUsageLimit"
            value={formData.totalUsageLimit || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Minimum Membership Requirement</label>
          <select
            className="form-select"
            name="minMembershipRequirement"
            value={formData.minMembershipRequirement || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Membership</option>
            {cardTypes.map(cardType => (
              <option key={cardType.cardTypeId} value={cardType.cardTypeId}>
                {cardType.cardName}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            {isEdit ? 'Update Coupon' : 'Add Coupon'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/company/coupon')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CouponForm;