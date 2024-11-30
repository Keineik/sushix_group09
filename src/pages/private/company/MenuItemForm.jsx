import React from 'react'

const MenuItemForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      category: '',
      description: '',
      image: null
    });
  
    return (
      <div className="container-fluid py-4">
        <h2 className="mb-4">Add Menu Item</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Form fields for menu item */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default MenuItemForm