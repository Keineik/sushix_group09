import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/category';

const Category = () => {
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
            const categoriesResponse = await fetchCategories();
            setCategories(categoriesResponse);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="container shadow">
            <div className="row bg-dark gy-2">
                <h5 className="text-white text-center p-2">Thực đơn</h5>
            </div>
            <div className="row pt-3 ps-4">
                {categories.map((category) => (
                    <p key={category.id}>
                        <Link
                            className="link-underline link-underline-opacity-0 custom-hover-container"
                            to={`/menu?categoryId=${category.categoryId}`}
                        >
                            {category.categoryName}
                        </Link>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Category;