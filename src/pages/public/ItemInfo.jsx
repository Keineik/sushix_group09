import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { fetchMenuItem, fetchMenuItems } from "../../api/menuItem";

const ItemInfo = () => {
    const {id} = useParams();
    const {addToCart} = useOutletContext();

    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [otherFood, setOtherFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadItemData = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedItem = await fetchMenuItem(id);
            setItem(fetchedItem);
        } catch (err) {
            setError("Failed to load item details.");
        } finally {
            setLoading(false);
        }
    };

    const loadOtherFoodData = async () => {
        try {
            const fetchedItems = await fetchMenuItems({ limit: 180 });
            const randomItems = getRandomItems(fetchedItems.items || [], 4);
            setOtherFood(randomItems);
        } catch (err) {
            console.error("Failed to load other food items.");
        }
    };

    const getRandomItems = (items, n) => {
        const randomItems = [];
        while (randomItems.length < n) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            if (!randomItems.includes(randomItem)) {
                randomItems.push(randomItem);
            }
        }
        return randomItems;
    };

    useEffect(() => {
        loadItemData();
        loadOtherFoodData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleIncrease = () => setQuantity((prev) => prev + 1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    if (loading) {
        return <div>Loading item details...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    if (!item) {
        return <div>Item not found!</div>;
    }

    return (
        <div className="item-info-page">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img
                            src={item.imgUrl}
                            alt={item.itemName}
                            className="img-fluid zoom-image"
                            style={{
                                maxWidth: "400px",
                                border: "2px solid #ddd",
                                borderRadius: "8px",
                                padding: "10px",
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="item-name" style={{ fontSize: "1.5rem" }}>
                            {item.itemName}
                        </h2>
                        <h4 className="item-price text-danger" style={{ fontSize: "1.2rem" }}>
                            {item.unitPrice.toLocaleString()}đ
                        </h4>

                        <p className="item-sold">
                            <strong>Số lượng đã bán: </strong>
                            {item.soldQuantity?.toLocaleString() || 0}
                        </p>

                        <div className="quantity-control my-4">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleDecrease}
                                disabled={quantity === 1}
                            >
                                -
                            </button>
                            <span className="mx-3">{quantity}</span>
                            <button className="btn btn-outline-secondary" onClick={handleIncrease}>
                                +
                            </button>
                        </div>
                        <hr />
                        <button
                            className="btn btn-danger btn-lg"
                            onClick={() => addToCart(item, quantity)}
                        >
                            <i className="bi bi-cart-plus me-2"></i>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h3 className="mb-4">Món ăn khác</h3>
                <div className="row">
                    {otherFood.map((foodItem) => (
                        <div key={foodItem.itemId} className="col-md-3 mb-4">
                            <div className="card h-100 border-0">
                                <Link to={`/menu/item/${foodItem.itemId}`}>
                                    <img
                                        src={foodItem.imgUrl}
                                        className="card-img-top img-hover"
                                        alt={foodItem.itemName}
                                        style={{ maxHeight: "200px", objectFit: "cover" }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <p className="card-text">{foodItem.itemName}</p>
                                    <h5 className="card-title text-danger">
                                        {foodItem.unitPrice.toLocaleString()}đ
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemInfo;