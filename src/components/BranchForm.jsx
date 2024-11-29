import React from 'react'

const BranchForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        manager: '',
        status: 'active'
    });

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Add Branch</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                                className="form-select"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BranchForm