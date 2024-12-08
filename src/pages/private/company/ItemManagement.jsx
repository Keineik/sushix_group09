import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import itemsData from '../../../dummy/items.json';
import categoriesData from '../../../dummy/categories.json';

//Currently not useable
const ItemManagement = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    //Test API calls
    useEffect(() => {
        // const fetchItems = async () => {
        //     const response = await axios.get('/api/items', {
        //         params: {
        //             page: currentPage,
        //             limit: 10,
        //             search: searchTerm,
        //             category: selectedCategory,
        //             sortKey: sortConfig.key,
        //             sortDirection: sortConfig.direction
        //         }
        //     });
        //     setItems(response.data.items);
        //     setTotalPages(response.data.totalPages);
        // };

        // const fetchCategories = async () => {
        //     const response = await axios.get('/api/categories');
        //     setCategories(response.data);
        // };

        // fetchItems();
        // fetchCategories();
        setCategories(categoriesData);
        setItems(itemsData);
    }, [currentPage, searchTerm, selectedCategory, sortConfig]);

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

    const handleDelete = async (id) => {
        await axios.delete(`/api/items/${id}`);
        setItems(items.filter(item => item.id !== id));
    };

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
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>
                                <Link to={`edit/${item.id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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