import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cardTypesData from '../../../dummy/cardtypes.json';

const MembershipForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        CardName: '',
        DiscountRate: '',
        PointsRequiredForUpgrade: '',
        PointsRequiredForRenewal: ''
    });

    useEffect(() => {
        if (isEdit) {
            const card = cardTypesData.find(card => card.CardTypeID === parseInt(id));
            if (card) {
                setFormData(card);
            } else {
                console.error(`Card with ID ${id} not found.`);
                navigate('/admin/company/membership');
            }
        }
    }, [id, isEdit, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // Handle edit logic
            console.log('Editing card:', formData);
        } else {
            // Handle add logic
            console.log('Adding new card:', formData);
        }
        navigate('/admin/company/membership');
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">{isEdit ? 'Edit Card' : 'Add Card'}</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Card Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.CardName}
                                onChange={(e) => setFormData({ ...formData, CardName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Discount Rate (%)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.DiscountRate}
                                onChange={(e) => setFormData({ ...formData, DiscountRate: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Points Required for Upgrade</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.PointsRequiredForUpgrade}
                                onChange={(e) => setFormData({ ...formData, PointsRequiredForUpgrade: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Points Required for Renewal</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.PointsRequiredForRenewal}
                                onChange={(e) => setFormData({ ...formData, PointsRequiredForRenewal: e.target.value })}
                                required
                            />
                        </div>
                        <div className="d-flex">
                            <button type="submit" className="btn btn-success me-2">
                                {isEdit ? 'Update Card' : 'Add Card'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/company/membership')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MembershipForm;