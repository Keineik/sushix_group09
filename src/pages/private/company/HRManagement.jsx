import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import staffsData from '../../../dummy/staffs.json';
import { fetchBranches } from '../../../api/branch'
import workHistoryData from '../../../dummy/workhistory.json';

const HRManagement = () => {
    const [staffs, setStaffs] = useState([]);
    const [branches, setBranches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        //fok

        setStaffs(staffsData);
        setBranches(branchesData);
    }, [currentPage, searchTerm, selectedBranch]);

    const getWorkHistory = (staffId) => {
        const history = workHistoryData.find(item => item.StaffID === staffId);
        return history ? history.History : [];
    };

    const handleDelete = async (id) => {
        setStaffs(staffs.filter(staff => staff.StaffID !== id));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">HR Management</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control w-25"
                />
                <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="form-select w-25"
                >
                    <option value="all">All Branches</option>
                    {branches.map(branch => (
                        <option key={branch.BranchID} value={branch.BranchID}>{branch.name}</option>
                    ))}
                </select>
                <Link to="add" className="btn btn-danger">Add New Staff</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map(staff => (
                        <tr key={staff.StaffID}>
                            <td>{staff.StaffID}</td>
                            <td>{staff.StaffName}</td>
                            <td>{staff.StaffDoB}</td>
                            <td>{staff.StaffGender}</td>
                            <td>{staff.DeptName}</td>
                            <td>{branches.find(branch => branch.BranchID === staff.BranchID)?.name}</td>
                            <td>
                                <div className="btn-group">
                                    <Link to={`edit/${staff.StaffID}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                                    <button onClick={() => handleDelete(staff.StaffID)} className="btn btn-sm btn-outline-danger">Delete</button>
                                    <button onClick={() => setSelectedStaff(staff)} className="btn btn-sm btn-outline-info">View History</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className="page-item mt-1">
                            <button
                                className="arrow-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li className="page-item" key={index + 1}>
                                <button
                                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button
                                className="arrow-btn  mt-1"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

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
                                                <td>{branches.find(branch => branch.BranchID === record.BranchID)?.name}</td>
                                                <td>{record.DeptName}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {getWorkHistory(selectedStaff.StaffID).length === 0 && <p>No work history available.</p>}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedStaff(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HRManagement;