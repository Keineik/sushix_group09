const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
         
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Về SushiX</h5>
            <p>Chúng tôi mang đến trải nghiệm sushi tươi ngon, đậm chất truyền thống Nhật Bản ngay tại Việt Nam. Với dịch vụ giao hàng nhanh chóng, chúng tôi cam kết sẽ mang đến bữa ăn tuyệt vời đến tận tay bạn.</p>
          </div>
          
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Trang Chủ</a></li>
              <li><a href="#!" className="text-white">Thực đơn</a></li>
              <li><a href="#!" className="text-white">Liên Hệ</a></li>
            </ul>
          </div>
          {/* Column 3: Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Liên Hệ</h5>
            <p>Email: <a href="mailto:contact@sushix.com" className="text-white">contact@sushix.com</a></p>
            <p>Điện thoại: <a href="tel:+8428392839" className="text-white">+84123456789</a></p>
            <p>Địa chỉ: 227 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col text-center">
            <p>&copy; 2024 SushiX, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;