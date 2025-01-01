import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomer, updateCustomer, createCustomer } from '../../../api/customer';
import { createMembershipCard } from '../../../api/membershipCard';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        custName: '',
        custGender: '',
        custPhoneNumber: '',
        custEmail: '',
        custCitizenId: ''
    });

    useEffect(() => {
        if (isEdit) {
            const loadCustomer = async () => {
                try {
                    const customer = await getCustomer(id);
                    setFormData(customer);
                } catch (error) {
                    console.error(`Failed to fetch customer with ID ${id}:`, error);
                }
            };
            loadCustomer();
        }
    }, [id, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedForm = {
            ...formData,
            custGender: formData.custGender === 'Male' ? 'M' : 'F'
        };
        try {
            if (isEdit) {
                await updateCustomer(id, updatedForm);
            } else {
                const newCustomer = await createCustomer(updatedForm);
                await createMembershipCard({custId: newCustomer.custId});                
            }
            navigate('/admin/branch/customers');
        } catch (error) {
            console.error('Failed to save customer:', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/branch/customers');
    };

    return (
        <div className="container">
            <h2>{isEdit ? 'Edit Customer' : 'Add New Customer'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="custName"
                        value={formData.custName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-select"
                        name="custGender"
                        value={formData.custGender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="custPhoneNumber"
                        value={formData.custPhoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="custEmail"
                        value={formData.custEmail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Citizen ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="custCitizenId"
                        value={formData.custCitizenId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    {isEdit ? 'Update Customer' : 'Add Customer'}
                </button>
                <button type="button" className="btn btn-outline-secondary ms-3" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CustomerForm;