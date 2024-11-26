import Category from "../components/Category"
import Items from "../components/Items"
import items from "../dummy/items.json"

const Menu = () => {
  return (
    <section className="product-display-section">
        <div className="container p-4">
            <div className="row">
                <div className="col col-3">
                    <Category />
                </div>
                <div className="col col-9">
                    <Items key = {items.id} items = {items}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Menu