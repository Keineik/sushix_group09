import { useState, useEffect, useContext } from 'react';
import { fetchMenuItems, updateMenuItem } from '../../../api/menuItem';
import { fetchCategories } from '../../../api/category';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../../components/Pagination';

const BranchMenu = () => {
    const { user } = useContext(AuthContext);
    const branchId = user.staff.department.branch.branchId;
    const itemsPerPage = 12;
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const fetchData = async () => {
        try {
            const menuItemsResponse = await fetchMenuItems({
                page: currentPage,
                limit: itemsPerPage,
                searchTerm,
                categoryId: selectedCategory === 'all' ? 0 : selectedCategory,
                sortKey: sortConfig.key,
                sortDirection: sortConfig.direction === 'desc',
                branchId
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

    return (
        <div className="container-fluid py-4">
            {/* <div>
                <p>Current Branch ID: {branchId}</p>  
            </div> */}

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

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCount / itemsPerPage)}
                onPageChange={handlePageChange}
            />

        </div>
    );
};

export default BranchMenu;