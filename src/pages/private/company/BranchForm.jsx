import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import branches from '../../../dummy/branches.json';

const BranchForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const branch = isEdit ? branches.find(branch => branch.BranchID === parseInt(id)) : {};

  const [formData, setFormData] = useState({
    name: branch?.name || '',
    address: branch?.address || '',
    phone: branch?.phone || '',
    hours: branch?.hours || '',
    imgSrc: branch?.imgSrc || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Implement edit functionality here
      console.log('Editing branch:', formData);
    } else {
      // Implement add functionality here
      console.log('Adding new branch:', formData);
    }
    navigate('/admin/branch/management');
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{isEdit ? 'Edit Branch' : 'Add Branch'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hours</label>
              <input
                type="text"
                className="form-control"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={formData.imgSrc}
                onChange={(e) => setFormData({ ...formData, imgSrc: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
  );
};

export default BranchForm;