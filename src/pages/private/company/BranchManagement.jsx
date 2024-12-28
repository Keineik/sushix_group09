import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBranches, deleteBranch } from '../../../api/branch';

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([]);

  const loadBranches = async () => {
    const { result } = await fetchBranches();
    console.log(result);
    setBranches(result || []);
  }

  useEffect(() => {
    loadBranches();
  }, []);

  const filteredBranches = branches.filter(branch =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (branchId) => {
    deleteBranch(branchId);
    setBranches(branches.filter(branch => branch.branchId !== branchId));
  };

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
        <Link to="add" className="btn btn-danger">
          Add Branch
        </Link>
      </div>

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
                  <td>{branch.branchName}</td>
                  <td>{branch.branchAddress}</td>
                  <td>{branch.branchPhoneNumber}</td>
                  <td>{branch.closingTime}-{branch.openingTime}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`edit/${branch.branchId}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i class="bi bi-pencil"></i>
                      </Link>
                      <Link
                        to={`/admin/branch/${branch.branchId}`}
                        className="btn btn-sm btn-outline-dark"
                      >
                        <i class="bi bi-gear"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(branch.branchId)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default BranchManagement;