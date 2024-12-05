import React from 'react';

const CardsPolicy = () => {
  return (
    <div className="policy-page container mt-4 mb-4" style={{ textAlign: 'justify' }}>
      <div
        className="policy-content"
        style={{
          border: 'none', // No border
          borderRadius: '8px', // Rounded corners
          padding: '20px', // Padding inside the div
          backgroundColor: 'transparent', // Transparent background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect on the border
        }}
      >
        <h2 className="section-title text-center mt-4" style={{ color: '#E82429' }}>
          Chính sách thẻ thành viên
        </h2>

        <h3>Hạng thẻ</h3>

        <h4>Membership</h4>
        <h5>1. Quyền lợi</h5>
        <ul>
          <li>Đăng ký mở thẻ miễn phí.</li>
          <li>Tích lũy điểm không thời hạn cho đến khi đạt mức nâng hạng thẻ SILVER.</li>
          <li>Được hưởng ưu đãi chiết khấu, giảm giá, tặng sản phẩm tùy theo chương trình.</li>
        </ul>
        <h5>2. Điều kiện</h5>
        <ul>
          <li>Khách hàng cung cấp đầy đủ thông tin cần thiết.</li>
          <li>Điều kiện NÂNG hạng thẻ SILVER: có tổng giá trị tiêu dùng tích lũy từ 10.000.000 VNĐ (100 điểm).</li>
        </ul>

        <h4>Silver</h4>
        <h5>1. Quyền lợi</h5>
        <ul>
          <li>Giảm 5% khi sử dụng dịch vụ trong hệ thống.</li>
          <li>Được hưởng ưu đãi chiết khấu, giảm giá, tặng sản phẩm tùy theo chương trình.</li>
          <li>Ưu đãi theo chương trình dành riêng cho khách hàng SILVER.</li>
        </ul>
        <h5>2. Điều kiện</h5>
        <ul>
          <li>Điều kiện ĐẠT hạng thẻ SILVER: tổng giá trị tiêu dùng tích lũy từ 10.000.000 VNĐ (100 điểm).</li>
          <li>Điều kiện GIỮ hạng thẻ SILVER: tổng giá trị tiêu dùng tích lũy từ 5.000.000 VNĐ (50 điểm) trong 1 năm.</li>
          <li>Điều kiện NÂNG hạng thẻ GOLD: tổng giá trị tiêu dùng tích lũy từ 10.000.000 VNĐ (100 điểm) trong 1 năm.</li>
          <li>Nếu tiêu dùng tích lũy dưới 5.000.000 VNĐ (50 điểm) trong 1 năm: hạng thẻ sẽ trở về Membership.</li>
        </ul>

        <h4>Gold</h4>
        <h5>1. Quyền lợi</h5>
        <ul>
          <li>Giảm 10% khi sử dụng dịch vụ trong hệ thống.</li>
          <li>Được hưởng ưu đãi chiết khấu, giảm giá, tặng sản phẩm tùy theo chương trình.</li>
          <li>Ưu đãi theo chương trình dành riêng cho khách hàng GOLD.</li>
        </ul>
        <h5>2. Điều kiện</h5>
        <ul>
          <li>Điều kiện ĐẠT hạng thẻ GOLD: tổng giá trị tiêu dùng tích lũy từ 10.000.000 VNĐ (100 điểm) trong 1 năm.</li>
          <li>Điều kiện GIỮ hạng thẻ GOLD: tổng giá trị tiêu dùng tích lũy từ 10.000.000 VNĐ (100 điểm) trong 1 năm.</li>
          <li>Nếu tiêu dùng tích lũy dưới 10.000.000 VNĐ (100 điểm) trong 1 năm: thẻ sẽ xuống hạng SILVER.</li>
        </ul>

        <h3>Điều khoản chung</h3>
        <ul>
          <li>1 điểm tương ứng 100.000 VNĐ (giá trị sau cùng khách hàng thanh toán).</li>
          <li>Được cộng dồn mức chiết khấu với các chương trình giảm giá món ăn khác.</li>
          <li>Được áp dụng sử dụng dịch vụ tại nhà hàng và delivery trong toàn hệ thống..</li>
          <li>Điểm số tích lũy được cộng dồn để áp dụng các chương trình chăm sóc khách hàng khác.</li>
          <li>Được nâng hạng thẻ ngay tại thời điểm đủ điều kiện giá trị tiêu dùng tích lũy.</li>
          <li>Thẻ có giá trị sử dụng trong vòng 01 năm kể từ ngày đạt hạng thẻ SILVER/GOLD, gia hạn hoặc nâng hạng thẻ.</li>
          <li>Thẻ sẽ trở về mức hạng thẻ Membership khi trong năm không phát sinh sử dụng bất cứ lần nào trong hệ thống..</li>
          <li>Thẻ có giá trị duy nhất cho chủ tài khoản thẻ.</li>
          <li>Vui lòng cung cấp thông tin chính xác khi thanh toán để tích lũy điểm và áp dụng chiết khấu của thẻ.</li>
          <li>
          Thẻ này do SushiX phát hành, SushiX có quyền từ chối sử dụng, tạm khóa, đình chỉ tài khoản thẻ trong một số trường hợp, nâng cấp, điều chỉnh, thay đổi, hủy bỏ chính sách mà không cần báo trước tới khách hàng.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardsPolicy;
