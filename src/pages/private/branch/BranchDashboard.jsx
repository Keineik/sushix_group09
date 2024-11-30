import { useState } from 'react';

const BranchDashboard = () => {
  const [stats] = useState({
    todayOrders: 45,
    todayRevenue: 12500000,
    monthlyOrders: 1250,
    monthlyRevenue: 325000000
  });

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Dashboard</h2>
      
      <p>Nothing here :/</p>
    </div>
  );
};

export default BranchDashboard