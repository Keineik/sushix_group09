import { useState, useEffect } from 'react';
import { fetchBranches } from '../../api/branch';
import { createReservation } from '../../api/onlineCustomer';

const Reservation = () => {
    const [includePreorder, setIncludePreorder] = useState(false);
    const [region, setRegion] = useState("");
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        CustName: '',
        CustPhoneNumber: '',
        CustEmail: '',
        branchId: null,
        reservationDate: '',
        reservationTime: '',
        numOfGuests: 0,
        rsNotes: '',
    });
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error reading cart from localStorage:", error);
            return [];
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const branchesResponse = await fetchBranches();
                console.log('Branches:', branchesResponse);
                console.log('Region:', region);
                setBranches(branchesResponse.filter((branch) => (branch.branchRegion === region)));
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        loadData();
        console.log('Cart:', cart);
    }, [region]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            console.log('Form data:', formData);
            await createReservation(formData);
            setSuccess(true);
            setFormData({
                CustName: '',
                CustPhoneNumber: '',
                CustEmail: '',
                branchId: null,
                reservationDate: '',
                reservationTime: '',
                numOfGuests: 0,
                rsNotes: '',
            });
        } catch (error) {
            console.error('Error creating reservation:', error);
            setError('Failed to create reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div>
                <h3
                    className="section-title text-center mt-4"
                    style={{
                        color: "#D32F2F",
                        fontWeight: "bold",
                    }}
                >
                    Đặt bàn trực tuyến
                </h3>
            </div>
            <div className="container py-4"
                style={{
                    backgroundColor: "#f2f2f2",
                    color: "#333333",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                <p className="text-center">
                    Quý khách vui lòng cung cấp thông tin để chúng tôi hỗ trợ đặt bàn tốt nhất.
                </p>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Đặt bàn thành công!</div>}
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label className="form-label">Họ tên (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="CustName"
                                    value={formData.CustName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="phoneNumber">Số điện thoại (*)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="CustPhoneNumber"
                                        value={formData.CustPhoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="emailAddress">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="CustEmail"
                                        value={formData.CustEmail}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="branchSelection">Chọn chi nhánh (*)</label>
                                    <select
                                        className="form-select"
                                        value={region}
                                        onChange={handleRegionChange}
                                        required>
                                        <option value="" disabled>
                                            -- Chọn chi nhánh --
                                        </option>
                                        <option value="Thành Phố Hồ Chí Minh">TP Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="restaurantSelection"></label>
                                    <select
                                        className="form-select"
                                        name="branchId"
                                        value={formData.branchId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn nhà hàng</option>
                                        {branches.map((branch) => (
                                            <option key={branch.branchID} value={branch.branchID}>
                                                {branch.branchName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="reservationDate">Ngày (*)</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="reservationDate"
                                        value={formData.reservationDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="reservationTime">Thời gian (*)</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        name="reservationTime"
                                        value={formData.reservationTime}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="guestCount">Số lượng khách (*)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="numOfGuests"
                                    value={formData.numOfGuests}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="specialNotes">Ghi chú</label>
                                <textarea
                                    className="form-control"
                                    name="rsNotes"
                                    value={formData.rsNotes}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={includePreorder}
                                    onChange={() => setIncludePreorder(!includePreorder)}
                                />
                                <label className="form-check-label">Kèm đặt trước món trong giỏ hàng</label>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-danger w-100 fw-bold" disabled={loading}>
                                    {loading ? 'Creating Reservation...' : 'Create Reservation'}
                                </button>
                            </div>

                        </form>
                    </div>

                    {!includePreorder &&
                        <div className="col-md-6">
                            <img
                                src="https://tokyodeli.com.vn/Data/Sites/3/media/img_0096.jpg"
                                alt="Reservation Background"
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                    }

                    {includePreorder && (
                        <div className="col-md-6">
                            <h4 className="mb-4 text-danger">Thông tin đơn đặt trước</h4>
                            <h5>Sản phẩm</h5>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {cart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center border-bottom py-3"
                                        style={{ gap: "15px" }}
                                    >
                                        <img
                                            src={item.imgUrl}
                                            alt={item.name}
                                            className="rounded"
                                            style={{
                                                width: "110px",
                                                height: "80px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6>{item.name}</h6>
                                            <div>
                                                <span>{item.price}</span>
                                                <span className="mx-3">x {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Reservation;