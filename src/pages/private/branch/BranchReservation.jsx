import React, { useState, useEffect, useContext } from 'react';
import { fetchReservations } from '../../../api/reservation';
import { AuthContext } from '../../../context/AuthContext';

const BranchReservation = () => {
    const { user } = useContext(AuthContext);
    const branchId = user?.staff.department.branch.branchId;
    const [activeTab, setActiveTab] = useState('Not Confirmed');
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCounts, setTotalCounts] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    const loadReservations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchReservations({
                branchId: branchId,
                page: currentPage,
                searchTerm: searchTerm
            });
            setReservations(response.items);
            setTotalCounts(response.totalCounts);
        } catch (error) {
            setError('Failed to fetch reservations');
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, [branchId, currentPage]);

    const filteredReservations = reservations.filter(
        (reservation) => reservation.RsStatus === activeTab
    );

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalCounts / itemsPerPage);

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Branch Reservations</h2>
            <ul className="nav nav-tabs mb-4">
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

            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ReservationID, Customer Name, CustPhoneNumber..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="card">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Number of Guests</th>
                                    <th>Reservation Time</th>
                                    <th>Arrival Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.map((reservation) => (
                                    <tr key={reservation.rsId}>
                                        <td>{reservation.rsId}</td>
                                        <td>{reservation.custName}</td>
                                        <td>{reservation.numOfGuests}</td>
                                        <td>{reservation.rsDateTime}</td>
                                        <td>{reservation.arrivalDateTime}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-info"
                                                onClick={() => handleViewDetails(reservation)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

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
                        <li className="page-item mt-1">
                            <button
                                className="arrow-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
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
                                <p><strong>Reservation ID:</strong> {selectedReservation.rsId}</p>
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