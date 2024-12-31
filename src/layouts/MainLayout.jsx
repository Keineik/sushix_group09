import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavbarDown from '../components/NavbarDown';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useState, useEffect } from 'react';

const MainLayout = () => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.itemId === product.itemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.itemId === product.itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } 
      setShowCart(true);
      return [
        ...prevCart,
        {
          itemId: product.itemId,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.itemId === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <div>
      <Navbar
        cart={cart}
        onCartClick={() => setShowCart(!showCart)}
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