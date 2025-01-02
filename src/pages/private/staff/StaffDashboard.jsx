import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { fetchStaff } from '../../../api/staff';

const StaffDashboard = () => {
  const { user } = useContext(AuthContext);
  const [staff, setStaff] = useState(null);

  const loadStaff = async () => {
    try {
      const response = await fetchStaff(user.staff.staffId);
      console.log(user)
      setStaff(response);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  }

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Staff Dashboard</h1>
      {staff ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Staff Information</h5>
            <p className="card-text"><strong>Staff ID:</strong> {staff.staffId}</p>
            <p className="card-text"><strong>Department Name:</strong> {user.staff.department.deptName}</p>
            <p className="card-text"><strong>Branch ID:</strong> {user.staff.department.branch.branchId}</p>
            <p className="card-text"><strong>Staff Name:</strong> {staff.staffName}</p>
            <p className="card-text"><strong>Date of Birth:</strong> {staff.staffDOB}</p>
            <p className="card-text"><strong>Gender:</strong> {staff.staffGender === 'M' ? 'Male':'Female'}</p>
            <p className="card-text"><strong>Phone Number:</strong> {staff.staffPhoneNumber}</p>
            <p className="card-text"><strong>Citizen ID:</strong> {staff.staffCitizenId}</p>
          </div>
        </div>
      ) : (
        <p>Loading staff information...</p>
      )}
    </div>
  );
};

export default StaffDashboard;