import React from 'react';
import { useParams } from 'react-router-dom';
import branches from '../../../dummy/branches.json';

const BranchDetails = () => {
  const { id } = useParams();
  const branch = branches.find(branch => branch.BranchID === parseInt(id));

  if (!branch) {
    return <div>Branch not found</div>;
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Branch Details</h2>
          <h3>{branch.name}</h3>
          <p><strong>Address:</strong> {branch.address}</p>
          <p><strong>Phone:</strong> {branch.phone}</p>
          <p><strong>Hours:</strong> {branch.hours}</p>
          <img src={branch.imgSrc} alt={branch.name} className="img-fluid" />
        </div>
  );
};

export default BranchDetails;