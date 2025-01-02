import { useState, useEffect, useContext } from 'react';
import { fetchReservations, fetchReservation } from '../../../api/reservation';
import { getCustomer } from '../../../api/customer';
import { fetchBranch } from '../../../api/branch';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../../components/Pagination';

const BranchReservation = () => {
    const { user } = useContext(AuthContext);
    const branchId = user?.staff.department.branch.branchId;
    const [activeTab, setActiveTab] = useState('Not Confirmed');
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    const loadReservations = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchReservations({
                page: currentPage,
                limit: itemsPerPage,
                searchTerm: searchTerm,
                status: activeTab,
                branchId: branchId,
                sortDirection: true,
            });
            setReservations(response.items);
            setTotalCount(response.totalCount);
        } catch (error) {
            setError('Failed to fetch reservations');
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, [branchId, currentPage, activeTab, searchTerm]);

    const loadReservation = async (rsId) => {
        try {
            const reservation = await fetchReservation(rsId);
            const customer = await getCustomer(reservation.custId);
            const branch = await fetchBranch(reservation.branchId);
            setSelectedReservation({ ...reservation, branch, customer } || null);
            console.log('Reservation:', { ...reservation, branch, customer });
        } catch (error) {
            console.error('Error fetching reservation:', error);
            throw error;
        }
    };

    const handleViewDetails = (rsId) => {
        loadReservation(rsId);
    };

    const handleCloseModal = () => {
        setSelectedReservation(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    return (
        <div className="container-fluid">
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
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'Cancelled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Cancelled')}
                    >
                        Cancelled
                    </button>
                </li>
            </ul>

            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ID, Customer name, Customer phone..."
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
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer Name</th>
                                <th>Phone Number</th>
                                <th>Number of Guests</th>
                                <th>Reservation Time</th>
                                <th>Arrival Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.rsId}>
                                    <td>{reservation.rsId}</td>
                                    <td>{reservation.custName}</td>
                                    <td>{reservation.custPhoneNumber}</td>
                                    <td>{reservation.numOfGuests}</td>
                                    <td>{formatDateTime(reservation.rsDateTime)}</td>
                                    <td>{formatDateTime(reservation.arrivalDateTime)}</td>
                                    {
                                        activeTab === 'Not Confirmed' ? (
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-info mx-1"
                                                    onClick={() => handleViewDetails(reservation.rsId)}
                                                >
                                                    <i className='bi bi-eye'></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-success mx-1"
                                                    onClick={() => handleViewDetails(reservation.rsId)}
                                                >
                                                    <i className='bi bi-calendar-check'></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleViewDetails(reservation.rsId)}
                                                >
                                                    <i className='bi bi-calendar-x'></i>
                                                </button>
                                            </td>
                                        ) : 
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-info"
                                                onClick={() => handleViewDetails(reservation.rsId)}
                                            >
                                                <i className='bi bi-eye'></i>
                                            </button>
                                        </td>

                                    }

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / itemsPerPage) || 1}
                onPageChange={handlePageChange}
            />

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
                                <p><strong>Number of Guests:</strong> {selectedReservation.numOfGuests}</p>
                                <p><strong>Reservation Date:</strong> {new Date(selectedReservation.rsDateTime).toLocaleString()}</p>
                                <p><strong>Arrival Date:</strong> {new Date(selectedReservation.arrivalDateTime).toLocaleString()}</p>
                                <p><strong>Notes:</strong> {selectedReservation.rsNotes || 'None'}</p>
                                <p><strong>Branch Name:</strong> {selectedReservation.branch.branchName || null}</p>
                                <p><strong>Status:</strong> {selectedReservation.rsStatus}</p>
                                <p><strong>Customer ID:</strong> {selectedReservation.custId}</p>
                                <p><strong>Customer Name:</strong> {selectedReservation.customer.custName}</p>
                                <p><strong>Customer Phone:</strong> {selectedReservation.customer.custPhoneNumber}</p>
                                <p><strong>Customer Email:</strong> {selectedReservation.customer.custEmail}</p>

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