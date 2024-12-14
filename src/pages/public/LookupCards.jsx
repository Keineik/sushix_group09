import { useState } from "react";
import customers from "../../dummy/customers";
const LookupCards = () => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [searchResult, setSearchResult] = useState(null);
  
    const handleSearch = (e) => {
      e.preventDefault();
  
      // Validate inputs
      if (!name || !cardNumber) {
        alert("Vui lòng nhập đầy đủ thông tin để tìm kiếm.");
        return;
      }
  
      // Perform search in the JSON data
      const result = customers.find(
        (customer) =>
          customer.CustName.toLowerCase() === name.toLowerCase() &&
          customer.MembershipCardID.toString() === cardNumber
      );
  
      // Update search result
      if (result) {
        setSearchResult(result);
      } else {
        setSearchResult("Không tìm thấy thông tin khách hàng.");
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="text-center mb-4">
          Vui lòng nhập các thông tin cần thiết để tra cứu điểm tích lũy của thẻ Member Card
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nhập họ và tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-card-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12Zm0-1H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
                    <path d="M3 8.5h6a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1ZM2 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5ZM2.5 6.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  placeholder="Nhập mã số thẻ"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-danger w-100">
                Tìm kiếm
              </button>
            </form>
            <div className="mt-4">
              {searchResult ? (
                typeof searchResult === "string" ? (
                  <div className="alert alert-danger">{searchResult}</div>
                ) : (
                  <div className="alert alert-success">
                    <h5>Thông tin khách hàng:</h5>
                    <p><strong>Họ và tên:</strong> {searchResult.CustName}</p>
                    <p><strong>Email:</strong> {searchResult.CustEmail}</p>
                    <p><strong>Số điện thoại:</strong> {searchResult.CustPhoneNumber}</p>
                    <p><strong>ID thẻ thành viên:</strong> {searchResult.MembershipCardID}</p>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LookupCards;