import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategory, updateCategory, createCategory } from '../../../api/category';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        categoryName: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (isEdit) {
                    const item = await fetchCategory(id);
                    setFormData(item);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isEdit) {
                await createCategory(formData);
                navigate('/admin/company/menu/categories');
                return;
            }
            await updateCategory(id, formData);
            navigate('/admin/company/menu/categories');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleCancel = () => {
        navigate('/admin/company/menu/categories');
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">{isEdit ? 'Edit Item' : 'Add Item'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        {isEdit ? 'Update Item' : 'Add Item'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;