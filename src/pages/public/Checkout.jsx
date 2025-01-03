import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { fetchMenuItem } from "../../api/menuItem";
import { AuthContext } from '../../context/AuthContext';
import { fetchBranches } from '../../api/branch';
import { fetchCoupons } from '../../api/coupon';
import { createDeliveryOrder } from '../../api/onlineCustomer';
import { createInvoice } from '../../api/staffwork';

const Checkout = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [branches, setBranches] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(isAuthenticated ? 2 : 1); // Default to Step 2 if logged in

    const loadCartItems = async () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const fetchedItems = await Promise.all(
                cart.map(async (cartItem) => {
                    const item = await fetchMenuItem(cartItem.itemId);
                    return { ...item, quantity: cartItem.quantity };
                })
            );
            setCartItems(fetchedItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };


    const loadBranches = async () => {
        try {
        const branchData = await fetchBranches();
        setBranches(branchData);
        } catch (error) {
        console.error("Error fetching branches:", error);
        }
    };

    const loadCoupons = async () => {
        try {
        const couponData = await fetchCoupons();
        setCoupons(couponData);
        } catch (error) {
        console.error("Error fetching coupons:", error);
        }
    };

    useEffect(() => {
        loadCartItems();
        loadBranches();
        loadCoupons();
    }, []);


    const [customerInfo, setCustomerInfo] = useState({
        name: isAuthenticated ? user.customer?.custName || '' : '',
        phone: isAuthenticated ? user.customer?.custPhoneNumber || '' : '',
        email: isAuthenticated ? user.customer?.custEmail || '' : '',
        address: isAuthenticated ? '' : '',
    });
    const [branch, setBranch] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    };

    const VAT_PERCENTAGE = 0.1;
    const SHIPPING_FEE = 30000;

    const calculateVAT = () => {
        return (calculateSubtotal() * VAT_PERCENTAGE);
    };

    const calculateTotal = () => {
        return calculateSubtotal() - discount + SHIPPING_FEE + calculateVAT();
    };

    const handleCoupon = () => {
        const today = new Date();
        const matchingCoupon = coupons.find(
            (coupon) =>
                coupon.couponCode === couponCode &&
                new Date(coupon.effectiveDate) <= today &&
                new Date(coupon.expiryDate) >= today
        );

        if (!matchingCoupon) {
            setError("Mã coupon không hợp lệ hoặc đã hết hạn!");
            setDiscount(0);
            return;
        }

        if (calculateSubtotal() < matchingCoupon.minPurchase) {
            setError(`Đơn hàng phải từ ${matchingCoupon.minPurchase.toLocaleString()} để sử dụng mã này.`);
            setDiscount(0);
            return;
        }

        let calculatedDiscount = 0;
        if (matchingCoupon.discountFlat) {
            calculatedDiscount = matchingCoupon.discountFlat;
        } else if (matchingCoupon.discountRate) {
            calculatedDiscount = (calculateSubtotal() * matchingCoupon.discountRate) / 100;
            if (matchingCoupon.maxDiscount) {
                calculatedDiscount = Math.min(calculatedDiscount, matchingCoupon.maxDiscount);
            }
        }

        setDiscount(calculatedDiscount);
        setError("");
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);  
        setError(null);    
        setSuccess(false); 
        // localStorage.removeItem('cart');

        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !branch) {
            setError("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            setLoading(false);
            return;
        }

        const orderDetails = cartItems.map(item => ({
            itemId: item.itemId, 
            quantity: item.quantity,
        }));

        const deliveryOrderRequest = {
            custName: customerInfo.name,
            custPhoneNumber: customerInfo.phone,
            custEmail: customerInfo.email || "",  
            branchId: branch.branchId,
            deliveryAddress: customerInfo.address,
            deliveryDateTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // luoi
            orderDetails: orderDetails
        };
        console.log("Delivery Order Request:", deliveryOrderRequest);

        try {
            const orderResponse = await createDeliveryOrder(deliveryOrderRequest);
            const orderId = orderResponse.order.orderId;

            const invoiceRequest = {
                orderId,
                paymentMethod,
                taxRate: VAT_PERCENTAGE,
                couponCode: couponCode
            };
            console.log("Invoice Request:", invoiceRequest);
            await createInvoice(invoiceRequest);
            setSuccess(true);  
            localStorage.removeItem('cart');
        } catch (error) {
            console.error("Error creating delivery order:", error);
            setError("Đặt hàng thất bại. Vui lòng thử lại!"); 
        } finally {
            setLoading(false);  
        }
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
                                value={branch ? branch.branchId : ""} 
                                onChange={(e) =>
                                    setBranch(
                                        branches.find((b) => b.branchId === parseInt(e.target.value))
                                    )
                                }
                            >
                                <option value="" disabled>Chọn chi nhánh</option>
                                {branches.map((b) => (
                                    <option key={b.branchId} value={b.branchId}>
                                        {b.branchName} - {b.branchAddress}
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
                                            value="Cash"
                                            checked={paymentMethod === "Cash"}
                                            onChange={() => setPaymentMethod("Cash")}
                                        />{" "}
                                        Thanh toán khi nhận hàng
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h4 className="mb-4 text-danger">Thông tin đơn hàng</h4>
                            <h5>Sản phẩm</h5>
                            {cartItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center border-bottom py-3"
                                    style={{gap: "15px"}}
                                >
                                    <img
                                        src={item.imgUrl}
                                        alt={item.itemName}
                                        className="rounded"
                                        style={{
                                            width: "100px",
                                            height: "80px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6>{item.itemName}</h6>
                                        <div>
                                            <span>{item.unitPrice.toLocaleString()}</span>
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
                                <span>VAT ({VAT_PERCENTAGE * 100}%):</span>
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
                                Xác nhận đặt hàng

                            </button>
                            {error && <p className="text-danger mt-2">{error}</p>}                    
                            {success && <div className="alert alert-success mt-2">Đặt hàng thành công!</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;