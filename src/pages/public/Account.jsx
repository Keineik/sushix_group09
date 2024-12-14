import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';

const Account = () => {
    const location = useLocation();
    const activeTab = location.pathname.split('/').pop();

    return (
        <div className="account-page container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4" style={{
                        maxHeight: '100px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div className="card-body p-3">
                            <h5 className="card-title mx-4 my-2"
                                style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#333'}}>Tài khoản của</h5>
                            <span className='card-text mx-4 my-2'>ZZZZ</span>
                        </div>
                    </div>

                    <div className="list-group">
                        <Link
                            to="/account/profile"
                            className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                        >
                            Thông tin tài khoản
                        </Link>
                        <Link
                            to="/account/deliverytracking"
                            className={`list-group-item list-group-item-action ${activeTab === 'deliverytracking' ? 'active' : ''}`}
                        >
                            Theo dõi đơn hàng
                        </Link>
                        <Link
                            to="/account/rewardhistory"
                            className={`list-group-item list-group-item-action ${activeTab === 'rewardhistory' ? 'active' : ''}`}
                        >
                            Lịch sử điểm thưởng
                        </Link>
                    </div>
                </div>

                <div className="col-md-9 mt-0">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Account;
