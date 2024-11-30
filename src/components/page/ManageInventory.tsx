import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Button, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const ManageInventory: React.FC = () => {
    const [statistics, setStatistics] = useState<any>({});
    const [lowStockSummary, setLowStockSummary] = useState<any>({});
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const { Option } = Select;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await axios.get('/api/inventory/statistics');
                setStatistics(statsResponse.data);

                const lowStockResponse = await axios.get('/api/inventory/low-stock');
                setLowStockSummary(lowStockResponse.data);

                const tableResponse = await axios.get('/api/inventory/products');
                setTableData(Array.isArray(tableResponse.data) ? tableResponse.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setTableData([]); // Fallback to an empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter and search functionality for inventory table
    const filteredTableData = tableData.filter((item) => {
        const matchesSearch = item.productName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? item.availability === filter : true;
        return matchesSearch && matchesFilter;
    });

    const columns = [
        {
            title: 'Item No',
            dataIndex: 'itemNo',
            key: 'itemNo',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `₹${price.toLocaleString()}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Sold Value',
            dataIndex: 'soldValue',
            key: 'soldValue',
            render: (value: number) => `₹${value.toLocaleString()}`,
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
        },
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
            render: (availability: string) => (
                <Tag color={availability === 'In-stock' ? 'green' : 'red'}>
                    {availability}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <Button type="link">Edit</Button>,
        },
    ];

    return (
        <div className="p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Manage Inventory</h1>
            </div>

            {/* Search and Filter Section */}
            <div className="flex items-center justify-between mb-5">
                <Input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: '8px', width: '200px' }}
                />
                <Select
                    placeholder="Filter by availability"
                    value={filter}
                    onChange={(value) => setFilter(value)}
                    style={{ width: '200px' }}
                >
                    <Option value="">Filter</Option>
                    <Option value="In-stock">In Stock</Option>
                    <Option value="Out-of-stock">Out of Stock</Option>
                </Select>
            </div>

            {/* Statistics Cards */}
            <div>
                <h2 className="text-xl mb-3">Overall Inventory</h2>
                <div className="grid grid-cols-4 gap-4 mb-5">
                    <div className="p-5 bg-gray-100 rounded-lg text-center shadow-sm">
                        <h2 className="text-lg font-semibold">Categories</h2>
                        <p className="text-2xl">{statistics.categories || 0}</p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded-lg text-center shadow-sm">
                        <h2 className="text-lg font-semibold">Total Products</h2>
                        <p className="text-2xl">
                            {statistics.totalProducts || 0}
                            <br />₹{statistics.inventoryOnHand?.value || 0}
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded-lg text-center shadow-sm">
                        <h2 className="text-lg font-semibold">Total Inventory On Hand</h2>
                        <p className="text-2xl">
                            {statistics.inventoryOnHand?.units || 0}
                            <br />₹{statistics.inventoryOnHand?.value || 0}
                        </p>
                    </div>
                    <div className="p-5 bg-gray-100 rounded-lg text-center shadow-sm">
                        <h2 className="text-lg font-semibold">Top Selling Products (Last 30 Days)</h2>
                        <p className="text-2xl">
                            {statistics.topSellingProducts?.units || 0}
                            <br />₹{statistics.topSellingProducts?.value || 0}
                        </p>
                    </div>
                </div>
            </div>


            {/* Low Stock Summary */}
            <div className="flex justify-center mb-5">
                <div className="p-5 bg-gray-100 rounded-lg text-center shadow-sm">
                    <h3 className="text-lg font-semibold">Low InStock Products (Cnt)</h3>
                    <p className="text-2xl">
                        Low InStock: {lowStockSummary.lowInStockCount || 0}
                        <br />
                        Out of stock: <span className="text-red-500">{lowStockSummary.outOfStockCount || 0}</span>
                    </p>
                </div>
            </div>


            {/* Table for Inventory */}
            <Table
                columns={columns}
                dataSource={filteredTableData}
                rowKey="itemNo"
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
            />
        </div>
    );
};

export default ManageInventory;
