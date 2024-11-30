import { useState } from 'react';
import items from '../../../dummy/items.json';
import categories from '../../../dummy/categories.json';

const BranchMenu = () => {
    const [menuItems, setMenuItems] = useState(
        items.map(item => ({
            ...item,
            available: true // Default all items to available
        }))
        // Change this later
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const menuCategories = ['all', ...categories.map(cat => cat.name)];

    const handleAvailabilityToggle = (itemId) => {
        setMenuItems(menuItems.map(item =>
            item.id === itemId
                ? { ...item, available: !item.available }
                : item
        ));

        // Handle back-end update
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Menu Management</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {menuCategories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="card">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}đ</td>
                                        <td>
                                            <span className={`badge bg-${item.available ? 'success' : 'danger'}`}>
                                                {item.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={item.available}
                                                    onChange={() => handleAvailabilityToggle(item.id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
};

export default BranchMenu;