// src/pages/admin/branch/StaffList.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import staffs from '../../../dummy/staffs.json';
import departments from '../../../dummy/departments.json';
import workHistory from '../../../dummy/workhistory.json';

const StaffList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaffs = staffs.filter(staff => {
    const matchesSearch = staff.StaffName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'all' || staff.DeptName === selectedDept;
    return matchesSearch && matchesDept;
  });

  const getWorkHistory = (staffId) => {
    const history = workHistory.find(item => item.StaffID === staffId);
    return history ? history.History : [];
  };

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

                        <button 
                        className="btn btn-sm btn-outline-info"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        View History
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      {/* Modal for Work History */}
      {selectedStaff && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`Work History of ${selectedStaff.StaffName}`}</h5>
                <button className="btn-close" onClick={() => setSelectedStaff(null)}></button>
              </div>
              <div className="modal-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>Quit Date</th>
                      <th>Branch</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getWorkHistory(selectedStaff.StaffID).map((record, index) => (
                      <tr key={index}>
                        <td>{record.StartDate}</td>
                        <td>{record.QuitDate}</td>
                        <td>{record.BranchID}</td>
                        <td>{record.DeptName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {getWorkHistory(selectedStaff.StaffID).length === 0 && <p>No work history available.</p>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedStaff(null)}>
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

export default StaffList;