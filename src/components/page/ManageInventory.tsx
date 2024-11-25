import React from 'react';
import { Table, Tag, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const ManageInventory: React.FC = () => {
    // Mock data for the table
    const data = Array(10).fill('').map((_, index) => ({
        key: index,
        itemNo: `QNC1B27B1729${index + 1}`,
        productName: 'Yang Set',
        price: '₹ 2,160.00',
        quantity: 20 - index,
        soldValue: 10 + index,
        expiryDate: 'None',
        availability: index % 2 === 0 ? 'In-stock' : 'Out of stock',
    }));

    // Columns definition for Ant Design Table
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
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Manage Inventory</h1>
                <div className="flex items-center">
                    <Input 
                        placeholder="Search" 
                        prefix={<SearchOutlined />} 
                        style={{ marginRight: '8px', width: '200px' }}
                    />
                    <Button type="primary">Filter</Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-5">
                <div className="p-5 bg-gray-100 rounded-lg text-center">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <p className="text-2xl">14</p>
                </div>
                <div className="p-5 bg-gray-100 rounded-lg text-center">
                    <h2 className="text-lg font-semibold">Total Products</h2>
                    <p className="text-2xl">868 <br />₹25000</p>
                </div>
                <div className="p-5 bg-gray-100 rounded-lg text-center">
                    <h2 className="text-lg font-semibold">Total Inventory On Hand</h2>
                    <p className="text-2xl">868 <br />₹25000</p>
                </div>
                <div className="p-5 bg-gray-100 rounded-lg text-center">
                    <h2 className="text-lg font-semibold">Top Selling Products (Last 30 Days)</h2>
                    <p className="text-2xl">Units <br />5<br />₹2500</p>
                </div>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg mb-5 text-center">
                <h3 className="text-lg font-semibold">Low InStock Products (Cnt)</h3>
                <p className="text-2xl">Low InStock: 12 <br />Out of stock: 2</p>
            </div>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
        </div>
    );
};

export default ManageInventory;
