import React from "react";
import branches from "../../dummy/branches.json";

const Reservation = () => {
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
                <div className="row">
                    <div className="col-md-6">
                        <form>
                            <div className="form-group mb-4">
                                <label htmlFor="fullName">Họ và tên (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="phoneNumber">Số điện thoại (*)</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="emailAddress">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailAddress"
                                        placeholder="Nhập email (không bắt buộc)"
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="branchSelection">Chọn chi nhánh (*)</label>
                                    <select className="form-control" id="branchSelection" required>
                                        <option value="" disabled>
                                            -- Chọn chi nhánh --
                                        </option>
                                        <option value="hcm">TP Hồ Chí Minh</option>
                                        <option value="hn">Hà Nội</option>
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="restaurantSelection"></label>
                                    <select className="form-control" id="restaurantSelection">
                                        <option value="" selected disabled>
                                            Chọn nhà hàng
                                        </option>
                                        {branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
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
                                        id="reservationDate"
                                        required
                                    />
                                </div>

                                {/* Time Selection */}
                                <div className="col-md-6 form-group">
                                    <label htmlFor="reservationTime">Thời gian (*)</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="reservationTime"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="guestCount">Số lượng khách (*)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="guestCount"
                                    placeholder="Nhập số lượng khách"
                                    min="1"
                                    required
                                />
                            </div>


                            {/* Notes Section */}
                            <div className="form-group mb-4">
                                <label htmlFor="specialNotes">Ghi chú</label>
                                <textarea
                                    className="form-control"
                                    id="specialNotes"
                                    placeholder="Nhập ghi chú (nếu có)"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-danger w-100 fw-bold">
                                    Gửi
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Image Section */}
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
                </div>
            </div>
        </main>
    );
};

export default Reservation;
