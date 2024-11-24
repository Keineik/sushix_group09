import React, { useState } from "react";


const promotions = [
  {
    CouponID: 1,
    CouponCode: "SUSHI10",
    CouponDesc: "Giảm 10% cho đơn từ 200.000 VND",
    DiscountFlat: null,
    DiscountRate: 10,
    MinOrderValue: 200000,
    MaxDiscountValue: 50000,
    EffectiveDate: "2024-11-01",
    ExpiredDate: "2024-11-20",
    TotalUsageLimit: 100,
    MinMembershipRequirement: "Silver",
  },
  {
    CouponID: 2,
    CouponCode: "FREESHIP",
    CouponDesc: "Miễn phí giao hàng cho đơn từ 100.000 VND",
    DiscountFlat: 30000,
    DiscountRate: null,
    MinOrderValue: 100000,
    MaxDiscountValue: null,
    EffectiveDate: "2024-11-01",
    ExpiredDate: "2024-11-30",
    TotalUsageLimit: 50,
    MinMembershipRequirement: "None",
  },
];

const Promotions = () => {
  const [search, setSearch] = useState("");

  const filteredPromotions = promotions.filter((promo) =>
    promo.CouponCode.toLowerCase().includes(search.toLowerCase()) ||
    promo.CouponDesc.toLowerCase().includes(search.toLowerCase())
  );

  const isExpired = (expiredDate) => {
    const currentDate = new Date();
    const expiredDateObj = new Date(expiredDate);
    return currentDate > expiredDateObj;
  };

  const isUsageLimitReached = (usageCount, limit) => {
    return usageCount >= limit;
  };

  return (
    <div className="container my-5">
    <h1 className="text-center text-danger mb-4"> <b>Khuyến Mãi Tại SushiX</b></h1>
    <div className="mb-3">
      <input
      type="text"
      className="form-control"
      placeholder="Tìm kiếm khuyến mãi..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="row">
        {filteredPromotions.map((promo) => (
        <div key={promo.CouponID} className="col-md-6 mb-4">
            <div className="card bg-light">
            <div className="card-body">
                <div
                  className="d-flex align-items-center"
                  style={{
                    padding: '5px 10px',
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#d9534f',
                    width: '25%',
                  }}
                >
                  <h5 className="m-0" style={{ marginRight: '10px' }}>
                    {promo.CouponCode}
                  </h5>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigator.clipboard.writeText(promo.CouponCode)}
                    style={{
                      color: '#d9534f',
                      marginLeft: '5px',
                      border: '2px dashed #d9534f',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#d9534f'; 
                      e.target.style.color = '#fff'; 
                      e.target.style.borderColor = '#c9302c'; 
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'; 
                      e.target.style.color = '#d9534f'; 
                      e.target.style.borderColor = '#d9534f'; 
                    }}
                  >
                    <i className="bi bi-clipboard"></i>
                  </button>
                </div>

                <p className="card-text">{promo.CouponDesc}</p>
                <p>
                <strong>Hiệu lực:</strong>{" "}
                {formatDate(promo.EffectiveDate)} - {formatDate(promo.ExpiredDate)}
                </p>
                <p>
                <strong>Giảm giá:</strong>{" "}
                {promo.DiscountFlat
                    ? `${promo.DiscountFlat.toLocaleString()} VND`
                    : `${promo.DiscountRate}%`}
                </p>
                {promo.MaxDiscountValue && (
                <p>
                    <strong>Giảm giá tối đa:</strong>{" "}
                    {promo.MaxDiscountValue.toLocaleString()} VND
                </p>
                )}
                <p>
                <strong>Đơn tối thiểu:</strong>{" "}
                {promo.MinOrderValue.toLocaleString()} VND
                </p>
                <p>
                <strong>Thành viên tối thiểu:</strong> {promo.MinMembershipRequirement}
                </p>
                {(isExpired(promo.ExpiredDate) || isUsageLimitReached(promo.UsageCount, promo.TotalUsageLimit)) && (
                  <span className="badge bg-danger">Hết hạn hoặc hết lượt sử dụng</span>
                )}
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
};

export default Promotions;

const formatDate = (date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('vi-VN', options);
};