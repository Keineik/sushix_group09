import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMenuItems, updateMenuItem } from '../../../api/menuItem';
import { fetchCategories } from '../../../api/category';

const ItemManagement = () => {
    const itemsPerPage = 12;
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            const menuItemsResponse = await fetchMenuItems({
                page: currentPage,
                limit: itemsPerPage,
                searchTerm,
                categoryId: selectedCategory === 'all' ? 0 : selectedCategory,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction === 'asc'
            });
            const categoriesResponse = await fetchCategories();
            setItems(menuItemsResponse.items || []);
            setTotalCount(menuItemsResponse.totalCount || 0);
            setCategories(categoriesResponse || []);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm, selectedCategory, sortConfig]);

    const handleUpdateDiscontinued = async (item) => {
        try {
            const updatedItem = { ...item, isDiscontinued: !item.isDiscontinued };
            await updateMenuItem(item.itemId, updatedItem);
            setItems(items.map(i => (i.itemId === item.itemId ? updatedItem : i)));
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (key) => {
        setSortConfig((prevSortConfig) => ({
            key,
            direction: prevSortConfig.key === key && prevSortConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control w-25"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="form-select w-25"
                >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <Link to="add" className="btn btn-danger">Add New Item</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th onClick={() => handleSortChange('id')}>ID</th>
                        <th onClick={() => handleSortChange('name')}>Name</th>
                        <th>Sold Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.itemName}</td>
                            <td>{item.soldQuantity}</td>
                            <td>{item.unitPrice}</td>
                            <td>
                                <span className={`badge bg-${item.isDiscontinued ? 'danger' : 'success'}`}>
                                    {item.isDiscontinued ? 'Discontinued' : 'Active'}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <Link to={`edit/${item.itemId}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={!item.isDiscontinued}
                                            onChange={() => handleUpdateDiscontinued(item)}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        <li className="page-item mt-1">
                            <button
                                className="arrow-btn"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li className="page-item" key={index + 1}>
                                <button
                                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className="page-item mt-1">
                            <button
                                className="arrow-btn"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ItemManagement;