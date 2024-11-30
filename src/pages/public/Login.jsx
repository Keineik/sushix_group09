import React from 'react';

const Login = () => {
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
                    ĐĂNG NHẬP 
                </h4>
            </div>
            <div className="container py-4">
                
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

                    

                            <button
                                type="submit"
                                className="btn btn-danger w-100"
                                
                            >
                                Đăng Nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
