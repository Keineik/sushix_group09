import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import itemsData from "../../dummy/items.json";
import {useOutletContext, Link} from "react-router-dom";

const ItemInfo = () => {
    const {id} = useParams();
    const item = itemsData.find((item) => item.id === parseInt(id));
    const {addToCart} = useOutletContext();

    const [quantity, setQuantity] = useState(1);
    const [otherFood, setOtherFood] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const getRandomItems = (n) => {
        const randomItems = [];
        while (randomItems.length < n) {
            const randomItem = itemsData[Math.floor(Math.random() * itemsData.length)];
            if (!randomItems.includes(randomItem)) {
                randomItems.push(randomItem);
            }
        }
        return randomItems;
    };


    useEffect(() => {
        setOtherFood(getRandomItems(4));
    }, [id]);

    const handleIncrease = () => setQuantity((prev) => prev + 1);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    if (!item) {
        return <div>Item not found!</div>;
    }

    return (
        <div className="item-info-page">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img
                            src={item.image}
                            alt={item.name}
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
                        <h2 className="item-name" style={{fontSize: "1.5rem"}}>
                            {item.name}
                        </h2>
                        <h4 className="item-price text-danger" style={{fontSize: "1.2rem"}}>
                            {item.price}đ
                        </h4>

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
                        <hr/>
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
                        <div key={foodItem.id} className="col-md-3 mb-4">
                            <div className="card h-100 border-0">
                                <Link to={`/menu/item/${foodItem.id}`}>
                                    <img
                                        src={foodItem.image}
                                        className="card-img-top img-hover"
                                        alt={foodItem.name}
                                        style={{maxHeight: "200px", objectFit: "cover"}}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <p className="card-text">{foodItem.name}</p>
                                    <h5 className="card-title text-danger">{foodItem.price}đ</h5>
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