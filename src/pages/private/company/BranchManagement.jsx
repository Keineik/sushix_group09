import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import branches from '../../../dummy/branches.json';

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Branch Management</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search branches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="add" className="btn btn-primary">
          Add Branch
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map(branch => (
                <tr key={branch.BranchID}>
                  <td>{branch.name}</td>
                  <td>{branch.address}</td>
                  <td>{branch.phone}</td>
                  <td>{branch.hours}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`edit/${branch.BranchID}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(branch.BranchID)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`details/${branch.BranchID}`}
                        className="btn btn-sm btn-outline-info"
                      >
                        Details
                      </Link>
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

const handleDelete = (branchId) => {
  // Do something :)
};

export default BranchManagement;