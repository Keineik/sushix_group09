import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStaff, updateStaff, createStaff } from '../../../api/staff';
import { fetchDistinctDepartments } from '../../../api/department';
import { fetchBranches } from '../../../api/branch';

const HRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const isEdit = Boolean(id);

  const loadDepartments = async () => {
    try {
      const response = await fetchDistinctDepartments();
      setDepartments(response);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const loadBranches = async () => {
    try {
      const branchesResponse = await fetchBranches();
      setBranches(branchesResponse || []);
    } catch (err) {
      console.error('Failed to fetch branches:', err);
    }
  };

  useEffect(() => {
    loadBranches();
    loadDepartments();
  }, []);

  const [formData, setFormData] = useState({
    staffName: '',
    staffDOB: '',
    staffGender: '',
    deptName: '',
    branchId: 0,
    staffPhoneNumber: '',
    staffCitizenId: '',
  });

  useEffect(() => {
    if (isEdit) {
      const loadStaff = async () => {
        try {
          const staff = await fetchStaff(id);
          setFormData(staff);
          setSelectedBranch(staff.branchId);
        } catch (err) {
          console.error('Failed to fetch staff:', err);
        }
      };
      loadStaff();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      branchId: parseInt(formData.branchId, 10),
      staffGender: formData.staffGender === 'Nam' ? 'M' : 'F',
    };
    console.log(updatedFormData);
    try {
      if (isEdit) {
        await updateStaff(id, updatedFormData);
        setNotification({ message: 'Staff updated successfully!', type: 'success' });
      } else {
        await createStaff(updatedFormData);
        setNotification({ message: 'Staff created successfully!', type: 'success' });
      }
      setTimeout(() => {
        navigate('/admin/company/hr');
      }, 3000);
    } catch (err) {
      console.error('Failed to save staff:', err);
      setNotification({ message: 'Failed to save staff. Please try again.', type: 'error' });
    }
  };

  const handleCancel = (e) => {
    navigate('/admin/company/hr');
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{isEdit ? 'Edit Staff' : 'Add Staff'}</h2>
      {notification.message && (
        <div className={`alert ${notification.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.staffName}
            onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={formData.staffDOB}
            onChange={(e) => setFormData({ ...formData, staffDOB: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            value={formData.staffGender}
            onChange={(e) => setFormData({ ...formData, staffGender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Branch</label>
          <select
            className="form-select"
            value={formData.branchId}
            onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
            required
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={formData.deptName}
            onChange={(e) => setFormData({ ...formData, deptName: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone number</label>
          <input
            type="text"
            className="form-control"
            value={formData.staffPhoneNumber}
            onChange={(e) => setFormData({ ...formData, staffPhoneNumber: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Citizen ID</label>
          <input
            type="text"
            className="form-control"
            value={formData.staffCitizenId}
            onChange={(e) => setFormData({ ...formData, staffCitizenId: e.target.value })}
            required
          />
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success">
            {isEdit ? 'Update Staff' : 'Add Staff'}
          </button>
          <button type="button" className="btn btn-outline-secondary ms-3" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HRForm;