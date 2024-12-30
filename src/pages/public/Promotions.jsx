import React, { useState, useEffect } from "react";
import { fetchCoupons } from "../../api/coupon";
import { fetchCardTypes } from '../../api/cardType';

const Promotions = () => {
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cardTypes, setCardTypes] = useState([]);

    useEffect(() => {
        const loadCoupons = async () => {
            try {
                setLoading(true);
                const fetchedPromotions = await fetchCoupons();
                setPromotions(fetchedPromotions);
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
            } finally {
                setLoading(false);
            }
        };

        const loadCardTypes = async () => {
            try {
                const cardTypesResponse = await fetchCardTypes();
                setCardTypes(cardTypesResponse || []);
            } catch (err) {
                console.error("Failed to fetch card types.");
            }
          };

        loadCoupons();
        loadCardTypes();
    }, []);

    const getCardName = (cardTypeId) => {
        const card = cardTypes.find((ct) => ct.cardTypeId === cardTypeId);
        return card ? card.cardName : 'Unknown';
  };

    const totalPages = Math.ceil(promotions.length / itemsPerPage);

    const displayedPromotions = promotions
    .filter(promo => {
        const couponCode = promo.CouponCode || "";
        const couponDesc = promo.CouponDesc || ""; 
        return (
            couponCode.toLowerCase().includes(search.toLowerCase()) ||
            couponDesc.toLowerCase().includes(search.toLowerCase())
        );
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const isExpired = (expiredDate) => {
        const currentDate = new Date();
        const expiredDateObj = new Date(expiredDate);
        return currentDate > expiredDateObj;
    };

    const isUsageLimitReached = (usageCount, limit) => {
        return usageCount >= limit;
    };

    const formatDate = (date) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(date).toLocaleDateString("vi-VN", options);
    };

    if (loading) {
        return <div className="text-center">Loading coupons...</div>;
    }



    return (
        <div className="container my-5">
            <h1 className="text-center text-danger mb-4"><b>Khuyến Mãi Tại SushiX</b></h1>

            {/* Search input */}
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
                {displayedPromotions.map((promo) => (
                    <div key={promo.CouponID} className="col-md-6 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        padding: "5px 10px",
                                        fontFamily: '"Courier New", Courier, monospace',
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        color: "#d9534f",
                                        width: "25%",
                                    }}
                                >
                                    <h5 className="m-0" style={{ marginRight: "10px" }}>
                                        {promo.couponCode}
                                    </h5>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={() => navigator.clipboard.writeText(promo.couponCode)}
                                        style={{
                                            color: "#d9534f",
                                            marginLeft: "5px",
                                            border: "2px dashed #d9534f",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#d9534f";
                                            e.target.style.color = "#fff";
                                            e.target.style.borderColor = "#c9302c";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "transparent";
                                            e.target.style.color = "#d9534f";
                                            e.target.style.borderColor = "#d9534f";
                                        }}
                                    >
                                        <i className="bi bi-clipboard"></i>
                                    </button>
                                </div>

                                <p className="card-text">{promo.couponDesc}</p>
                                <p>
                                    <strong>Hiệu lực:</strong>{" "}
                                    {formatDate(promo.effectiveDate)} - {formatDate(promo.expiryDate)}
                                </p>
                                <p>
                                    <strong>Giảm giá:</strong>{" "}
                                    {promo.discountFlat
                                        ? `${promo.discountFlat.toLocaleString()} VND`
                                        : `${promo.discountRate*100}%`}
                                </p>
                                {promo.MaxDiscountValue && (
                                    <p>
                                        <strong>Giảm giá tối đa:</strong>{" "}
                                        {promo.maxDiscount.toLocaleString()} VND
                                    </p>
                                )}
                                <p>
                                    <strong>Đơn tối thiểu:</strong>{" "}
                                    {promo.minPurchase.toLocaleString()} VND
                                </p>
                                <p>
                                    <strong>Thành viên tối thiểu:</strong> {getCardName(promo.minMembershipRequirement)}
                                </p>
                                {(isExpired(promo.expiryDate) || isUsageLimitReached(promo.RemainingUsage, promo.TotalUsageLimit)) && (
                                    <span className="badge bg-danger">Hết hạn hoặc hết lượt sử dụng</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <nav className="mt-4">
                <ul className="pagination justify-content-center align-items-center">
                    <li className="page-item">
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
                                className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className="page-item">
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
    );
};

export default Promotions;