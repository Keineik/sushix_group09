import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NavbarDown from '../components/NavbarDown';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
      }
      setShowCart(true);
      return [...prevCart, { ...product, quantity }];
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