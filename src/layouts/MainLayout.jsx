import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavbarDown from '../components/NavbarDown';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } 
      setShowCart(true);
      return [
        ...prevCart,
        {
          id: product.itemId,
          name: product.itemName,
          price: product.unitPrice,
          imgUrl: product.imgUrl,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={() => setShowCart(!showCart)}
        isLoggedIn={isAuthenticated}
        onLogout={logout} // Use logout from context
        user={user} // Pass logged-in user info, if needed (optional)
      />
      <NavbarDown />
      <main>
        <Outlet
          context={{ cart, addToCart, removeFromCart, updateQuantity }}
        />
      </main>
      {showCart && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          onClose={() => setShowCart(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;