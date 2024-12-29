import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCardTypes, deleteCardType } from '../../../api/cardType';

const MembershipManagement = () => {
    const [cardTypes, setCardTypes] = useState([]);

    const fetchData = async () => {
        const cardTypeResponse = await fetchCardTypes();
        setCardTypes(cardTypeResponse || []);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        deleteCardType(id);
        setCardTypes(cardTypes.filter(card => card.CardTypeID !== id));
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Membership Management</h2>
            <div className="d-flex justify-content-end mb-4">
                <Link to="add" className="btn btn-danger">Add New Card</Link>
            </div>
            <div className="row">
                {cardTypes.map(card => (
                    <div key={card.cardTypeId} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{card.cardName}</h5>
                                <p className="card-text"><strong>Discount Rate:</strong> {card.discountRate*100}%</p>
                                <p className="card-text"><strong>Points Required for Upgrade:</strong> {card.pointsRequiredForRenewal}</p>
                                <p className="card-text"><strong>Points Required for Renewal:</strong> {card.pointsRequiredForUpgrade}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`edit/${card.cardTypeId}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                                    <button onClick={() => handleDelete(card.cardTypeId)} className="btn btn-sm btn-outline-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembershipManagement;