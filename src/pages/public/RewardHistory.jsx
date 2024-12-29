import React, { useState, useEffect } from 'react';
import rewardHistoryData from "../../dummy/membershipcards.json"; 
import customers from '../../dummy/customers.json';

const RewardHistoryPage = () => {
  const [rewardHistory, setRewardHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInCustID = 1;

    const loggedInUser = customers.find((customer) => customer.CustID === loggedInCustID);

    if (loggedInUser) {
      setUser({
        name: loggedInUser.CustName,
        email: loggedInUser.CustEmail,
        phone: loggedInUser.CustPhoneNumber,
      });

      const userHistory = rewardHistoryData.filter((entry) => entry.CustID === loggedInCustID);
      setRewardHistory(userHistory);
    }
  }, []);

  return (
    <div className="container">
      <h3 className="section-title" style={{ color: '#E82429', fontWeight: 'bold' }}>
        Lịch sử điểm thưởng
      </h3>

      {!user ? (
        <p>Loading user information...</p>
      ) : (
        <>
          

          {rewardHistory.length === 0 ? (
            <p style={{ fontSize: "0.9rem" }}>Không có lịch sử điểm thưởng!</p>
          ) : (
            <table className="table table-bordered w-auto" style={{ fontSize: "0.9rem" }}>
              <thead>
                <tr>
                  <th>Điểm</th>
                  <th>Thời gian</th>
                  <th>Điểm khả dụng tại thời điểm</th>
                </tr>
              </thead>
              <tbody>
                {rewardHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.Points}</td>
                    <td>{new Date(entry.IssueDate).toLocaleString()}</td>
                    <td>{entry.Points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default RewardHistoryPage;
