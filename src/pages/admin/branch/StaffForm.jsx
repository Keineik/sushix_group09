import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import staffs from '../../../dummy/staffs.json';
import departments from '../../../dummy/departments.json';

const StaffForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        StaffName: '',
        StaffDoB: '',
        StaffGender: '',
        DeptName: '',
        BranchID: 1
    });

    useEffect(() => {
        if (isEdit) {
            const staff = staffs.find(staff => staff.StaffID === parseInt(id));
            if (staff) {
                setFormData(staff);
            }
        }
    }, [id, isEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // Handle edit logic
            console.log('Editing staff:', formData);
        } else {
            // Handle add logic
            console.log('Adding new staff:', formData);
        }
        navigate('/admin/branch/staffs');
    };

    const handleCancel = (e) => {
        navigate('/admin/branch/staffs');
    }

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">{isEdit ? 'Edit Staff' : 'Add Staff'}</h2>
            <div className="card">
                <div className="card-body">
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
                        <div className="mb-5">
                            <label className="form-label">Department</label>
                            <select
                                className="form-select"
                                value={formData.DeptName}
                                onChange={(e) => setFormData({ ...formData, DeptName: e.target.value })}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.DeptName} value={dept.DeptName}>
                                        {dept.DeptName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-primary">
                                {isEdit ? 'Update Staff' : 'Add Staff'}
                            </button>
                            <button type="button" className="btn btn-outline-secondary ms-3" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StaffForm;