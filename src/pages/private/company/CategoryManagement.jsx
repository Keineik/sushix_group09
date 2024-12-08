import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import categoriesData from '../../../dummy/categories.json';

//Currently not useable
const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //Test API calls
    useEffect(() => {
        // const fetchCategories = async () => {
        //     const response = await axios.get('/api/categories', {
        //         params: { search: searchTerm }
        //     });
        //     setCategories(response.data);
        // };

        // fetchCategories();
        setCategories(categoriesData);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/categories/${id}`);
        setCategories(categories.filter(category => category.id !== id));
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
                <Link to="add" className="btn btn-danger">Add New Category</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link to={`edit/${category.id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                                <button onClick={() => handleDelete(category.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManagement;