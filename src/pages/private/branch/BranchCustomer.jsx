import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomers } from '../../../api/customer';
import { fetchMembershipCardByCustomer } from '../../../api/membershipCard';
import { fetchCardTypes } from '../../../api/cardType';
import Pagination from '../../../components/Pagination';

const CustomerList = () => {
  const itemsPerPage = 12;
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [membershipCard, setMembershipCard] = useState(null);
  const [cardTypes, setCardTypes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetchCustomers({
          page: currentPage,
          limit: itemsPerPage,
          searchTerm: searchTerm,
        });
        setCustomers(response.items);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    loadCustomers();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const loadCardTypes = async () => {
      try {
        const response = await fetchCardTypes();
        setCardTypes(response);
      } catch (error) {
        console.error('Failed to fetch card types:', error);
      }
    };

    loadCardTypes();
  }, []);

  const handleViewMembershipCard = async (customer) => {
    setSelectedCustomer(customer);
    try {
      const card = await fetchMembershipCardByCustomer(customer.custId);
      setMembershipCard(card);
    } catch (error) {
      console.error('Failed to fetch membership card:', error);
      setMembershipCard(null);
    }
  };

  const getCardType = (cardTypeId) => {
    return cardTypes.find(type => type.cardTypeId === cardTypeId);
  };

  const calculateAccessTime = (startDateTime, endDateTime) => {
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);
    const diffMs = endTime - startTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customers</h2>
        <Link to="add" className="btn btn-danger">
          Add Customer
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control w-25"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>CitizenID</th>
              <th>Last Access - Time Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.custId}>
                <td>{customer.custId}</td>
                <td>{customer.custName}</td>
                <td>{customer.custEmail}</td>
                <td>{customer.custGender}</td>
                <td>{customer.custPhoneNumber}</td>
                <td>{customer.custCitizenId}</td>
                <td>
                  {customer.lastAccess?.EndDateTime} /
                  <b>
                    {customer.lastAccess?.EndDateTime &&
                      calculateAccessTime(
                        customer.lastAccess.StartDateTime,
                        customer.lastAccess.EndDateTime
                      )}
                  </b>
                </td>
                <td>
                  <div className="btn-group">
                    <Link to={`edit/${customer.CustID}`} className="btn btn-sm btn-outline-primary">
                      <i className='bi bi-pencil'></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className='bi bi-trash'></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleViewMembershipCard(customer)}
                    >
                      <i class="bi bi-person-vcard"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / itemsPerPage)}
        onPageChange={handlePageChange}
      />

      {selectedCustomer && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`Membership Card Details for ${selectedCustomer.CustName}`}</h5>
                <button className="btn-close" onClick={() => setSelectedCustomer(null)}></button>
              </div>
              <div className="modal-body">
                {membershipCard ? (
                  <div>
                    <p><strong>Card ID:</strong> {membershipCard.cardId}</p>
                    <p><strong>Card type:</strong> {getCardType(membershipCard.cardTypeId).cardName}</p>
                    <p><strong>Issue Date:</strong> {membershipCard.issuedDate}</p>
                    <p><strong>Points:</strong> {membershipCard.points}</p>
                    <p><strong>Last Updated:</strong> {membershipCard.lastUpdated}</p>
                    {membershipCard.cardType ? (
                      <>
                        <p><strong>Card Name:</strong> {membershipCard.cardType.cardName}</p>
                        <p><strong>Discount Rate:</strong> {membershipCard.cardType.discountRate}%</p>
                      </>
                    ) : (
                      <p>Card type details not available.</p>
                    )}
                  </div>
                ) : (
                  <p>No Membership Card Found.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>
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

export default CustomerList;