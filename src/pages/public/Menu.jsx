import Category from "../../components/Category"
import Items from "../../components/Items"
import { useOutletContext } from "react-router-dom";

const Menu = () => {
    const { addToCart } = useOutletContext(); 
  
    return (
      <section className="product-display-section">
        <div className="container p-4">
          <div className="row">
            <div className="col col-3">
              <Category />
            </div>
            <div className="col col-9">
              <Items onAddToCart={addToCart} />
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Menu