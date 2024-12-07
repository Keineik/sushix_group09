import React, { useState, useEffect } from 'react';
import reservationsData from '../../../dummy/reservations.json';

const BranchReservation = () => {
    const [activeTab, setActiveTab] = useState('Not Confirmed');
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        setReservations(reservationsData);
    }, []);

    const filteredReservations = reservations.filter(
        (reservation) => reservation.RsStatus === activeTab
    );

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Branch Reservations</h2>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Not Confirmed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Not Confirmed')}
                    >
                        Not Confirmed
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Confirmed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Confirmed')}
                    >
                        Confirmed
                    </button>
                </li>
            </ul>
            <div className="card mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Reservation ID</th>
                                <th>Customer ID</th>
                                <th>Number of Guests</th>
                                <th>Reservation Date</th>
                                <th>Arrival Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations.map((reservation) => (
                                <tr key={reservation.RsID}>
                                    <td>{reservation.RsID}</td>
                                    <td>{reservation.CustID}</td>
                                    <td>{reservation.NumOfGuests}</td>
                                    <td>{new Date(reservation.RsDateTime).toLocaleString()}</td>
                                    <td>{new Date(reservation.ArrivalDateTime).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleViewDetails(reservation)}
                                        >
                                            View Details
                                        </button>
                                        {activeTab == 'Not Confirmed' &&
                                            <button
                                                className="btn btn-sm btn-outline-success ms-2"
                                                onClick={() => handleConfirmReservation(reservation.RsID)}
                                            >
                                                Confirm
                                            </button>
                                        }
                                        {activeTab == 'Not Confirmed' &&
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => handleCancelReservation(reservation.RsID)}
                                            >
                                                Cancel
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedReservation && (
                <div
                    className="modal show"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reservation Details</h5>
                                <button className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Reservation ID:</strong> {selectedReservation.RsID}</p>
                                <p><strong>Number of Guests:</strong> {selectedReservation.NumOfGuests}</p>
                                <p><strong>Reservation Date:</strong> {new Date(selectedReservation.RsDateTime).toLocaleString()}</p>
                                <p><strong>Arrival Date:</strong> {new Date(selectedReservation.ArrivalDateTime).toLocaleString()}</p>
                                <p><strong>Notes:</strong> {selectedReservation.RsNotes}</p>
                                <p><strong>Branch ID:</strong> {selectedReservation.BranchID}</p>
                                <p><strong>Customer ID:</strong> {selectedReservation.CustID}</p>
                                <p><strong>Status:</strong> {selectedReservation.RsStatus}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BranchReservation;