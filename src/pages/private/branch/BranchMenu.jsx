import { useState, useEffect, useContext } from 'react';
import { fetchMenuItems, updateMenuItem, deleteMenuItem, createMenuItem } from '../../../api/menuItem';
import { fetchCategories } from '../../../api/category';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../../components/Pagination';

const BranchMenu = () => {
    const { user } = useContext(AuthContext);
    const branchId = user.staff.department.branch.branchId;
    const itemsPerPage = 12;
    const [items, setItems] = useState([]); // Branch menu items
    const [totalCount, setTotalCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [allItems, setAllItems] = useState([]); // All available items
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ itemName: '', unitPrice: '', categoryId: '', soldQuantity: 0 });

    const fetchData = async () => {
        try {
            // Fetch branch menu items
            const menuItemsResponse = await fetchMenuItems({
                page: currentPage,
                limit: itemsPerPage,
                searchTerm,
                categoryId: selectedCategory === 'all' ? 0 : selectedCategory,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction === 'desc',
                branchId
            });

            // Fetch all available menu items
            const allMenuItemsResponse = await fetchMenuItems({
                page: 1,
                limit: 1000, // Adjust the limit to get all items
                searchTerm: '',
                categoryId: 0,
                sortKey: 'id',
                sortDirection: true,
                branchId: 0 // No need to filter by branch for all items
            });

            const categoriesResponse = await fetchCategories();
            setItems(menuItemsResponse.items || []);
            setTotalCount(menuItemsResponse.totalCount || 0);
            setCategories(categoriesResponse || []);

            // Filter all items to exclude those already in the branch menu
            const filteredItems = allMenuItemsResponse.items.filter(item =>
                !menuItemsResponse.items.some(branchItem => branchItem.itemId === item.itemId)
            );
            setAllItems(filteredItems);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm, selectedCategory, sortConfig, branchId]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleUpdateDiscontinued = async (item) => {
        try {
            const updatedItem = { ...item, isDiscontinued: !item.isDiscontinued };
            await updateMenuItem(item.itemId, updatedItem);
            setItems(items.map(i => (i.itemId === item.itemId ? updatedItem : i)));
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteMenuItem(itemId);
            setItems(items.filter(i => i.itemId !== itemId));
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSortChange = (key) => {
        setSortConfig((prevSortConfig) => ({
            key,
            direction: prevSortConfig.key === key && prevSortConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddItem = async () => {
        try {
            const response = await createMenuItem(newItem);
            setItems([...items, response]);
            setIsAddFormOpen(false);  // Close the form after adding the item
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    const handleSelectItemToAdd = (item) => {
        setNewItem({ ...newItem, itemId: item.itemId, itemName: item.itemName });
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Branch Menu</h2>
                <button onClick={() => setIsAddFormOpen(true)} className="btn btn-primary">
                    Add Item
                </button>
            </div>
            {isAddFormOpen && (
                <div className="card shadow-sm mb-4" style={{ maxHeight: "160px", margin: "0 auto" }}>
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <select
                                className="form-select"
                                value={newItem.itemId}
                                onChange={(e) =>
                                    handleSelectItemToAdd(allItems.find(item => item.itemId === e.target.value))
                                }
                            >
                                <option value="">Select an item</option>
                                {allItems.map(item => (
                                    <option key={item.itemId} value={item.itemId}>
                                        {item.itemName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-success me-2" onClick={handleAddItem}>
                                <i className="bi bi-plus-circle"></i> Add Item
                            </button>
                            <button className="btn btn-secondary" onClick={() => setIsAddFormOpen(false)}>
                                <i className="bi bi-x-circle"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="form-select w-25"
                >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                    ))}
                </select>
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
                    {filteredItems.map(item => (
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
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteItem(item.itemId)}
                                    >
                                        <i className="bi bi-archive-fill"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BranchMenu;
