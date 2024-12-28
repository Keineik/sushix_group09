import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity, onClose }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleConfirmOrder = () => {
  onClose();
  window.scrollTo(0, 0);
  navigate("/checkout", { state: { cart } });
};

  return (
    <div
      className="cart-modal"
      style={{
        position: "fixed",
        top: "0",
        right: "20px",
        width: "600px",
        height: "auto",
        backgroundColor: "#fff",
        boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        zIndex: "1051",
        borderRadius: "8px",
        overflowY: "auto",
        maxHeight: "80vh",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          border: "none",
          background: "none",
          fontSize: "20px",
        }}
      >
        &times;
      </button>
      <h3 className="text-center mb-4" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Giỏ Hàng
      </h3>

      {cart.length === 0 ? (
        <p className="text-center">Giỏ hàng trống!</p>
      ) : (
        <>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{item.name}</span>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                    <span>{item.price.toLocaleString()} ₫</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="btn btn-sm btn-outline-secondary"
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="btn btn-sm btn-outline-secondary"
                        style={{ marginLeft: "5px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between">
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Tổng cộng:</span>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "red" }}>
              {calculateTotal().toLocaleString()} ₫
            </span>
          </div>

          <button
            className="btn btn-danger w-100 mt-4"
            style={{
              padding: "12px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "white",
            }}
            onClick={handleConfirmOrder}
          >
            Xác nhận đơn hàng
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;