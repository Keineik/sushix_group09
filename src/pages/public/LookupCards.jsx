import { useState } from "react";
import customers from "../../dummy/customers";
import { getMembershipCard } from "../../api/membershipCard";

const LookupCards = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSearch = async(e) => {
      e.preventDefault();
  
      // Validate inputs
      if (!cardNumber) {
        alert("Vui lòng nhập đầy đủ thông tin để tìm kiếm.");
        return;
      }
      setIsLoading(true); // Show loading indicator
      // Perform search in the JSON data
      try {

        const result = await getMembershipCard(cardNumber);
  
        // Validate if the name matches the fetched membership card
        if (result.CustName.toLowerCase() === name.toLowerCase()) {
          setSearchResult(result);
        } else {
          setSearchResult("Tên không khớp với ID thẻ thành viên.");
        }
      } catch (error) {
        setSearchResult("Không tìm thấy thông tin khách hàng.");
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };
  
    return (
      <div className="container mt-5">
        <div className="text-center mb-4">
          Vui lòng nhập các thông tin cần thiết để tra cứu điểm tích lũy của thẻ Membership
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
              <button type="submit" className="btn btn-danger w-100" disabled={isLoading}>
              {isLoading ? "Đang tìm kiếm..." : "Tìm kiếm"}
            </button>
            </form>
            <div className="mt-4">
              {searchResult ? (
                typeof searchResult === "string" ? (
                  <div className="alert alert-danger">{searchResult}</div>
                ) : (
                  <div className="alert alert-success">
                    <h5>Thông tin khách hàng:</h5>
                    <p><strong>ID thẻ thành viên:</strong> {searchResult.CardID}</p>
                    <p><strong>Điểm:</strong> {searchResult.Points}</p>
                    <p><strong>Ngày phát hành:</strong> {searchResult.IssueDate}</p>
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