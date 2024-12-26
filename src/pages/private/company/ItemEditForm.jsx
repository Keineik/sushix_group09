import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItem, updateMenuItem } from '../../../api/menuItem';
import { fetchCategories } from '../../../api/category';

const ItemEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        itemName: '',
        unitPrice: '',
        servingUnit: '',
        categoryId: '',
        soldQuantity: '',
        isDiscontinued: false,
        imgUrl: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse || []);

                if (isEdit) {
                    const item = await getMenuItem(id);
                    setFormData(item);
                    console.log('item:', item);
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
            await updateMenuItem(id, formData);
            navigate('/admin/company/items');
        } catch (error) {
            console.error('Error updating menu item:', error);
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
        navigate('/admin/company/menu/items');
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">{isEdit ? 'Edit Item' : 'Add Item'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Unit Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serving Unit</label>
                    <input
                        type="text"
                        className="form-control"
                        name="servingUnit"
                        value={formData.servingUnit}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Sold Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="soldQuantity"
                        value={formData.soldQuantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imgUrl"
                        value={formData.imgUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="isDiscontinued"
                        checked={formData.isDiscontinued}
                        onChange={(e) => setFormData({ ...formData, isDiscontinued: e.target.checked })}
                    />
                    <label className="form-check-label">Discontinued</label>
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

export default ItemEditForm;