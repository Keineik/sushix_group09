import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import staffsData from '../../../dummy/staffs.json';
import branchesData from '../../../dummy/branches.json';
import departmentsData from '../../../dummy/departments.json';

const HRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    StaffName: '',
    StaffDoB: '',
    StaffGender: '',
    DeptName: '',
    BranchID: ''
  });

  useEffect(() => {
    if (isEdit) {
      const staff = staffsData.find(staff => staff.StaffID === parseInt(id));
      if (staff) {
        setFormData(staff);
      } else {
        console.error(`Staff with ID ${id} not found.`);
        navigate('/admin/company/hr');
      }
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Handle edit logic
      console.log('Editing staff:', formData);
    } else {
      // Handle add logic
      console.log('Adding new staff:', formData);
    }
    navigate('/admin/company/hr');
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{isEdit ? 'Edit Staff' : 'Add Staff'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.StaffName}
            onChange={(e) => setFormData({ ...formData, StaffName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={formData.StaffDoB}
            onChange={(e) => setFormData({ ...formData, StaffDoB: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            value={formData.StaffGender}
            onChange={(e) => setFormData({ ...formData, StaffGender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={formData.DeptName}
            onChange={(e) => setFormData({ ...formData, DeptName: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departmentsData.map(dept => (
              <option key={dept.DeptName} value={dept.DeptName}>
                {dept.DeptName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Branch</label>
          <select
            className="form-select"
            value={formData.BranchID}
            onChange={(e) => setFormData({ ...formData, BranchID: e.target.value })}
            required
          >
            <option value="">Select Branch</option>
            {branchesData.map(branch => (
              <option key={branch.BranchID} value={branch.BranchID}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            {isEdit ? 'Update Staff' : 'Add Staff'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/company/hr')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HRForm;