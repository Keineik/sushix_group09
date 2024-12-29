import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBranch, createBranch, updateBranch } from '../../../api/branch';

const BranchForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    branchName: '',
    branchAddress: '',
    branchRegion: '',
    openingTime: '',
    closingTime: '',
    branchPhoneNumber: '',
    hasCarParking: false,
    hasBikeParking: false,
    imgUrl: ''
  });

  const loadData = async () => {
    if (isEdit) {
      try {
        const branchResponse = await fetchBranch(id);
        setFormData({
          branchName: branchResponse.branchName || '',
          branchAddress: branchResponse.branchAddress || '',
          branchRegion: branchResponse.branchRegion || '',
          openingTime: branchResponse.openingTime || '',
          closingTime: branchResponse.closingTime || '',
          branchPhoneNumber: branchResponse.branchPhoneNumber || '',
          hasCarParking: branchResponse.hasCarParking || false,
          hasBikeParking: branchResponse.hasBikeParking || false,
          imgUrl: branchResponse.imgUrl || ''
        });
      } catch (error) {
        console.error('Error fetching branch:', error);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData:', formData);
    try {
      if (isEdit) {
        await updateBranch(id, formData);
      } else {
        await createBranch(formData);
      }
      navigate('/admin/company/branches');
    } catch (error) {
      console.error('Error saving branch:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{isEdit ? 'Edit Branch' : 'Add Branch'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Branch Name</label>
          <input
            type="text"
            className="form-control"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Branch Address</label>
          <input
            type="text"
            className="form-control"
            name="branchAddress"
            value={formData.branchAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Branch Region</label>
          <input
            type="text"
            className="form-control"
            name="branchRegion"
            value={formData.branchRegion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Opening Time</label>
          <input
            type="time"
            className="form-control"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Closing Time</label>
          <input
            type="time"
            className="form-control"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Branch Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="branchPhoneNumber"
            value={formData.branchPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="hasCarParking"
            checked={formData.hasCarParking}
            onChange={handleChange}
          />
          <label className="form-check-label">Has Car Parking</label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="hasBikeParking"
            checked={formData.hasBikeParking}
            onChange={handleChange}
          />
          <label className="form-check-label">Has Bike Parking</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {isEdit ? 'Update Branch' : 'Add Branch'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/company/branches')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchForm;