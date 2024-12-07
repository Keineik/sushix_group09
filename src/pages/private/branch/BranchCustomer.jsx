import { useState } from 'react';
import { Link} from 'react-router-dom';
import customers from '../../../dummy/customers.json';
import membershipCards from '../../../dummy/membershipCards.json';
import cardTypes from '../../../dummy/cardTypes.json';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomer = customers.filter(customer =>
    customer.CustName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMembershipCard = (customerId) => {
    return membershipCards.find(card => card.CustID === customerId);
  };

  const getCardType = (cardTypeId) => {
    return cardTypes.find(type => type.CardTypeID === cardTypeId);
  };

  const calculateAccessTime = (startDateTime, endDateTime) => {
    const startTime = new Date(startDateTime);
    const endTime = new Date(endDateTime);
    const diffMs = endTime - startTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m`;
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Customers</h2>
        <Link to="add" className="btn btn-primary">
          Add Customer
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
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
              {filteredCustomer.map(customer => (
                <tr key={customer.CustID}>
                  <td>{customer.CustID}</td>
                  <td>{customer.CustName}</td>
                  <td>{customer.CustEmail}</td>
                  <td>{customer.CustGender}</td>
                  <td>{customer.CustPhoneNumber}</td>
                  <td>{customer.CustCitizenID}</td>
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
                      <Link 
                        to={`edit/${customer.CustID}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => alert(`Deleting Customer ${customer.CustID}`)}
                      >
                        Delete
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-info"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        Membership Card
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{`Membership Card Details for ${selectedCustomer.CustName}`}</h5>
                <button className="btn-close" onClick={() => setSelectedCustomer(null)}></button>
              </div>
              <div className="modal-body">
                {(() => {
                  const card = getMembershipCard(selectedCustomer.CustID);
                  if (card) {
                    const cardType = getCardType(card.CardTypeID);
                    return (
                      <div>
                        <p><strong>Card ID:</strong> {card.CardID}</p>
                        <p><strong>Issue Date:</strong> {card.IssueDate}</p>
                        <p><strong>Points:</strong> {card.Points}</p>
                        <p><strong>Last Updated:</strong> {card.LastUpdated}</p>
                        {cardType ? (
                          <>
                            <p><strong>Card Name:</strong> {cardType.CardName}</p>
                            <p><strong>Discount Rate:</strong> {cardType.DiscountRate}%</p>
                          </>
                        ) : (
                          <p>Card type details not available.</p>
                        )}
                      </div>
                    );
                  }
                  return <p>No Membership Card Found.</p>;
                })()}
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