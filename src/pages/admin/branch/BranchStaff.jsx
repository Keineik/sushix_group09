// src/pages/admin/branch/StaffList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import staffs from '../../../dummy/staffs.json';
import departments from '../../../dummy/departments.json';

const StaffList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredStaffs = staffs.filter(staff => {
    const matchesSearch = staff.StaffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || staff.DeptName === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staffs</h2>
        <Link to="add" className="btn btn-primary">
          Add Staff
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select 
            className="form-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept.DeptName} value={dept.DeptName}>
                {dept.DeptName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaffs.map(staff => (
                  <tr key={staff.StaffID}>
                    <td>{staff.StaffID}</td>
                    <td>{staff.StaffName}</td>
                    <td>{staff.StaffDoB}</td>
                    <td>{staff.StaffGender}</td>
                    <td>{staff.DeptName}</td>
                    <td>
                      <div className="btn-group">
                        <Link 
                          to={`edit/${staff.StaffID}`} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          Edit
                        </Link>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(staff.StaffID)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default StaffList;