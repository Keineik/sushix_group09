import { useNavigate } from "react-router-dom";
import { fetchMenuItem } from "../api/menuItem";
import { useEffect, useState } from "react";

const Cart = ({ cart, removeFromCart, updateQuantity, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const loadCartItems = async () => {
    try {
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

  useEffect(() => {
    loadCartItems();
  }, [cart]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
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
    navigate("/checkout");
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
            {cartItems.map((item) => (
              <div key={item.itemId} style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <img
                  src={item.imgUrl}
                  alt={item.itemName}
                  style={{
                    width: "60px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{item.itemName}</span>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                    <span>{item.unitPrice.toLocaleString()} ₫</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={() => handleUpdateQuantity(item.itemId, item.quantity - 1)}
                        className="btn btn-sm btn-outline-secondary"
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.itemId, item.quantity + 1)}
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