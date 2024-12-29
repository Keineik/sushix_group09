import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import promotions from "../../dummy/promotions.json";
import branches from "../../dummy/branches.json";
import customers from '../../dummy/customers.json';


const Checkout = ({isLoggedIn}) => {
    // isLoggedIn = true;
    const location = useLocation();
    const navigate = useNavigate();
    // const cart = location.state?.cart || [];
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error reading cart from localStorage:", error);
            return [];
        }
    });
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");
    const [step, setStep] = useState(isLoggedIn ? 2 : 1); // Default to Step 2 if logged in

    const loggedInCustID = 1;

    const loggedInUser = customers.find((customer) => customer.CustID === loggedInCustID);

    const [customerInfo, setCustomerInfo] = useState({
        name: isLoggedIn ? loggedInUser.CustName : "",
        phone: isLoggedIn ? loggedInUser.CustPhoneNumber : "",
        email: isLoggedIn ? loggedInUser.CustEmail : "",
        address: ""
    });
    const [branch, setBranch] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("credit");

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const VAT_PERCENTAGE = 10;
    const SHIPPING_FEE = 30.000;

    const calculateVAT = () => {
        return (calculateSubtotal() * VAT_PERCENTAGE) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() - discount + SHIPPING_FEE + calculateVAT();
    };

    const handleCoupon = () => {
        const today = new Date();
        const matchingCoupon = promotions.find(
            (coupon) =>
                coupon.CouponCode === couponCode &&
                new Date(coupon.EffectiveDate) <= today &&
                new Date(coupon.ExpiredDate) >= today
        );

        if (!matchingCoupon) {
            setError("Mã coupon không hợp lệ hoặc đã hết hạn!");
            setDiscount(0);
            return;
        }

        if (calculateSubtotal() < matchingCoupon.MinOrderValue) {
            setError(`Đơn hàng phải từ ${matchingCoupon.MinOrderValue.toLocaleString()} để sử dụng mã này.`);
            setDiscount(0);
            return;
        }

        let calculatedDiscount = 0;
        if (matchingCoupon.DiscountFlat) {
            calculatedDiscount = matchingCoupon.DiscountFlat;
        } else if (matchingCoupon.DiscountRate) {
            calculatedDiscount = (calculateSubtotal() * matchingCoupon.DiscountRate) / 100;
            if (matchingCoupon.MaxDiscountValue) {
                calculatedDiscount = Math.min(calculatedDiscount, matchingCoupon.MaxDiscountValue);
            }
        }

        setDiscount(calculatedDiscount);
        setError("");
    };

    const handlePayment = () => {
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !branch) {
            setError("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }
        alert("Thanh toán thành công!");
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="checkout-page container mt-5">
            {step === 1 && (
                <div
                    className="text-center p-4"
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "15px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h4 className="mb-4" style={{color: "#dc3545"}}>
                        Chọn phương thức đặt hàng
                    </h4>
                    <div className="d-flex flex-column align-items-center">
                        <button
                            className="btn checkout-option w-75 mb-3 py-2 d-flex align-items-center justify-content-between"
                            onClick={() => setStep(2)}
                        >
                            Đặt hàng không cần đăng ký
                            <span className="arrow">→</span>
                        </button>
                        <button
                            className="btn checkout-option w-75 py-2 d-flex align-items-center justify-content-between"
                            onClick={handleLoginRedirect}
                        >
                            Tôi đã có tài khoản
                            <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <>
                    <div className="row">
                        <div className="col-md-7">
                            <h4 className="mb-4 text-danger">Thông tin khách hàng</h4>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Họ tên"
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                required
                            />
                            <input
                                type="tel"
                                className="form-control mb-2"
                                placeholder="Số điện thoại"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                required
                            />
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Email"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            />
                            <textarea
                                className="form-control"
                                placeholder="Địa chỉ giao hàng"
                                rows={3}
                                value={customerInfo.address}
                                onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                                required
                            />

                            <h6 className=" text-danger mt-4">Chọn chi nhánh nhà hàng</h6>
                            <select
                                className="form-control"
                                value={branch?.BranchID || ""}
                                onChange={(e) =>
                                    setBranch(
                                        branches.find((b) => b.BranchID === parseInt(e.target.value))
                                    )
                                }
                            >
                                <option value="" disabled>Chọn chi nhánh</option>
                                {branches.map((b) => (
                                    <option key={b.BranchID} value={b.BranchID}>
                                        {b.name} - {b.address}
                                    </option>
                                ))}
                            </select>
                            {error && !branch && <p className="text-danger mt-2"><i>Vui lòng chọn chi nhánh</i></p>}

                            <div className="mt-3">
                                <h6 className="mb-4 text-danger">Chọn phương thức thanh toán</h6>
                                <div className="d-flex flex-column">
                                    <label>
                                        <input
                                            type="radio"
                                            value="cash"
                                            checked={paymentMethod === "cash"}
                                            onChange={() => setPaymentMethod("cash")}
                                        />{" "}
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h4 className="mb-4 text-danger">Thông tin đơn hàng</h4>
                            <h5>Sản phẩm</h5>
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center border-bottom py-3"
                                    style={{gap: "15px"}}
                                >
                                    <img
                                        src={item.imgUrl}
                                        alt={item.name}
                                        className="rounded"
                                        style={{
                                            width: "100px",
                                            height: "80px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6>{item.name}</h6>
                                        <div>
                                            <span>{item.price.toLocaleString()}</span>
                                            <span className="mx-3">x {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-7"></div>

                        <div className="col-md-5 mt-3">
                            <h5 className="mb-4 text-danger">Chi tiết thanh toán</h5>
                            <p className="d-flex justify-content-between">
                                <span>Tiền hàng:</span>
                                <span>{calculateSubtotal().toLocaleString()}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Giảm giá:</span>
                                <span className="text-success">- {discount.toLocaleString()}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Phí vận chuyển:</span>
                                <span>{SHIPPING_FEE.toLocaleString()}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Tạm tính:</span>
                                <span>{calculateSubtotal().toLocaleString()}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>VAT ({VAT_PERCENTAGE}%):</span>
                                <span>{calculateVAT().toLocaleString()}</span>
                            </p>
                            <h5 className="d-flex justify-content-between mt-3 border-top pt-3">
                                <span>Tổng cộng:</span>
                                <span className="text-danger">{calculateTotal().toLocaleString()}</span>
                            </h5>

                            <div className="mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập mã giảm giá"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary w-100 mt-2"
                                    onClick={handleCoupon}
                                >
                                    Áp dụng mã giảm giá
                                </button>
                            </div>
                        </div>

                        <div className="col-md-5 offset-md-7 mt-2">
                            <button className="btn btn-danger w-100 text-white" onClick={handlePayment}>
                                Xác nhận và thanh toán
                            </button>
                            {error && <p className="text-danger mt-2">{error}</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;