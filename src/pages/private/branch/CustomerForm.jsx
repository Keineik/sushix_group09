import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customers from '../../../dummy/customers.json';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        CustName: '',
        CustDoB: '',
        CustGender: '',
        CustPhoneNumber: '',
        CustEmail: '',
        CustCitizenID: ''
    });

    useEffect(() => {
        if (isEdit) {
            const customer = customers.find(cust => cust.CustID === parseInt(id));
            if (customer) {
                setFormData(customer);
            } else {
                console.error(`Customer with ID ${id} not found.`);
                navigate('/admin/branch/customers');
            }
        }
    }, [id, isEdit, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.CustName || !formData.CustDoB || !formData.CustGender || !formData.CustPhoneNumber || !formData.CustEmail || !formData.CustCitizenID) {
            alert('Please fill out all required fields.');
            return;
        }

        if (isEdit) {
            // Update customer logic
            console.log('Updating customer:', formData);
        } else {
            // Add new customer logic
            console.log('Adding new customer:', formData);
        }
        navigate('/admin/branch/customers');
    };

    const handleCancel = () => {
        navigate('/admin/branch/customers');
    };

    return (
        <div className="container-fluid py-4">
            <h2>{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="CustName" className="form-label">Name</label>
                            <input
                                type="text"
                                id="CustName"
                                className="form-control"
                                value={formData.CustName}
                                onChange={(e) => setFormData({ ...formData, CustName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CustDoB" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                id="CustDoB"
                                className="form-control"
                                value={formData.CustDoB}
                                onChange={(e) => setFormData({ ...formData, CustDoB: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CustGender" className="form-label">Gender</label>
                            <select
                                id="CustGender"
                                className="form-select"
                                value={formData.CustGender}
                                onChange={(e) => setFormData({ ...formData, CustGender: e.target.value })}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CustPhoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                id="CustPhoneNumber"
                                className="form-control"
                                value={formData.CustPhoneNumber}
                                onChange={(e) => setFormData({ ...formData, CustPhoneNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CustEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                id="CustEmail"
                                className="form-control"
                                value={formData.CustEmail}
                                onChange={(e) => setFormData({ ...formData, CustEmail: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="CustCitizenID" className="form-label">Citizen ID</label>
                            <input
                                type="text"
                                id="CustCitizenID"
                                className="form-control"
                                value={formData.CustCitizenID}
                                onChange={(e) => setFormData({ ...formData, CustCitizenID: e.target.value })}
                                required
                            />
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-primary">
                                {isEdit ? 'Update Customer' : 'Add Customer'}
                            </button>
                            <button type="button" className="btn btn-outline-secondary ms-3" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default CustomerForm;