import React from 'react';

const Register = () => {
    return (
        <main>
            <div>
                <h4
                    className="section-title text-center mt-4"
                    style={{
                        color: "#D32F2F",
                        fontWeight: "bold",
                    }}
                >
                    ĐĂNG KÝ TÀI KHOẢN
                </h4>
            </div>
            <div className="container py-4">
                <p className="text-center">
                    Đăng ký tài khoản để nhận ưu đãi và cập nhật thông tin
                </p>
                
                <div className="row justify-content-center">
                    <div className="col-md-4">
                    <hr/>
                        <form>
                               {/* Tên Đăng Nhập (Email hoặc Số điện thoại) */}
                            <div className="form-group mb-4">
                                <label htmlFor="username">Tên Đăng Nhập (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    aria-label="Tên Đăng Nhập"
                                    required
                                />
                            </div>

                            {/* Số Điện Thoại */}
                            <div className="form-group mb-4">
                                <label htmlFor="phone">Số Điện Thoại (*)</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    aria-label="Số Điện Thoại"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group mb-4">
                                <label htmlFor="email">Email (*)</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-label="Email"
                                    required
                                />
                            </div>

                            {/* Mã Thẻ Thành Viên */}
                            <div className="form-group mb-4">
                                <label htmlFor="membershipCode">Mã Thẻ Thành Viên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="membershipCode"
                                    aria-label="Mã Thẻ Thành Viên"
                                    required
                                />
                            </div>

                            {/* Họ & Tên */}
                            <div className="form-group mb-4">
                                <label htmlFor="fullName">Họ & Tên (*)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    aria-label="Họ & Tên"
                                    required
                                />
                            </div>

                            {/* Mật Khẩu */}
                            <div className="form-group mb-4">
                                <label htmlFor="password">Mật Khẩu (*)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    aria-label="Mật Khẩu"
                                    required
                                />
                            </div>

                            {/* Xác Nhận Mật Khẩu */}
                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu (*)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    aria-label="Xác Nhận Mật Khẩu"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                
                            >
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
