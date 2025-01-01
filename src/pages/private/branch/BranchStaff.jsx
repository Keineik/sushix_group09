import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchDistinctDepartments } from '../../../api/department';
import { fetchStaffs, fetchStaffWorkHistory, deleteStaff } from '../../../api/staff';
import { AuthContext } from '../../../context/AuthContext';

const BranchStaff = () => {
    const { user } = useContext(AuthContext);
    const branchId = user?.staff.department.branch.branchId;
    const [staffs, setStaffs] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [workHistory, setWorkHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 12;

    const loadStaffs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchStaffs({
                page: currentPage,
                limit: itemsPerPage,
                searchTerm: searchTerm,
                branchId: branchId,
                department: selectedDepartment === 'all' ? null : selectedDepartment
            });
            setStaffs(response.staffs || []);
            setTotalPages(Math.ceil(response.totalCount / itemsPerPage));
        } catch (err) {
            setError("Failed to fetch staffs.");
        } finally {
            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        try {
            const departmentsResponse = await fetchDistinctDepartments();
            setDepartments(departmentsResponse || []);
        } catch (err) {
            console.error('Failed to fetch departments:', err);
        }
    };

    useEffect(() => {
        loadStaffs();
    }, [currentPage, searchTerm, selectedDepartment]);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadWorkHistory = async (staffId) => {
        try {
            const history = await fetchStaffWorkHistory(staffId);
            setWorkHistory(history || []);
        } catch (err) {
            console.error('Failed to fetch work history:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStaff(id);
            setStaffs(staffs.filter(staff => staff.staffId !== id));
        } catch (err) {
            console.error('Failed to delete staff:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleViewHistory = (staff) => {
        setSelectedStaff(staff);
        loadWorkHistory(staff.StaffID);
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Staffs</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control w-25"
                />
                <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="form-select w-25"
                >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
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
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center">Loading...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="7" className="text-danger text-center">{error}</td>
                        </tr>
                    ) : (
                        staffs.map(staff => (
                            <tr key={staff.staffId}>
                                <td>{staff.staffId}</td>
                                <td>{staff.staffName}</td>
                                <td>{staff.staffDoB}</td>
                                <td>{staff.staffGender}</td>
                                <td>{staff.deptName}</td>
                                <td>{branches.find(branch => branch.BranchID === staff.BranchID)?.name}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`edit/${staff.staffId}`} className="btn btn-sm btn-outline-primary">
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(staff.staffId)} className="btn btn-sm btn-outline-danger">
                                            <i className='bi bi-trash'></i>
                                        </button>
                                        <button onClick={() => handleViewHistory(staff)} className="btn btn-sm btn-outline-info">
                                            <i className='bi bi-clock-history'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
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
                                <h5 className="modal-title">{`Work History of ${selectedStaff.staffName}`}</h5>
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
                                        {workHistory.map((record, index) => (
                                            <tr key={index}>
                                                <td>{record.StartDate}</td>
                                                <td>{record.QuitDate}</td>
                                                <td>{branches.find(branch => branch.BranchID === record.BranchID)?.name}</td>
                                                <td>{record.DeptName}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {getWorkHistory(selectedStaff.staffId).length === 0 && <p>No work history available.</p>}
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

export default BranchStaff;