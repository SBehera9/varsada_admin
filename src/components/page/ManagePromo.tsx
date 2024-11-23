import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd'; // Import Ant Design Table component

export default function ManagePromo() {
  // State to store data fetched from the backend
  const [data, setData] = useState({
    itemNo: '', // Field for item number
    updatedStockDate: '', // Field for the updated stock date
    updatedStock: {
      openingStock: 0,
      newInventory: 0,
      newOnHandTotal: 0,
    },
    productInfo: {
      name: '',
      category: '',
      subCategory: '',
      expiryDate: '',
      colors: '',
      sizes: '',
      price: '',
    },
    stockInfo: {
      openingStock: 0,
      stockSold: 0,
      stockDamaged: 0,
      onHandStock: 0,
    },
    updatedStockHistory: [],
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-backend-api.com/api/endpoint'); // Replace with your backend endpoint
        setData(response.data); // Populate state with the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Opening On Hand Stock',
      dataIndex: 'openingStock',
      key: 'openingStock',
    },
    {
      title: 'New Inventory Count',
      dataIndex: 'newInventory',
      key: 'newInventory',
    },
    {
      title: 'New On Hand Total',
      dataIndex: 'newOnHandTotal',
      key: 'newOnHandTotal',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <button className="text-blue-500">Edit</button> // Example action
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <h1 className="text-lg font-bold mb-4">
        Item no: {data.itemNo} ({data.productInfo.name})
      </h1>

      {/* Updated Stock Information */}
      <div className="border p-4 rounded mb-4">
        <h2 className="text-md font-semibold mb-2">
          Updated Stock Information ({data.updatedStockDate})
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p>Opening On Hand Stock</p>
            <p className="font-bold">{data.updatedStock.openingStock}</p>
          </div>
          <div>
            <p>New Inventory Count</p>
            <p className="font-bold">{data.updatedStock.newInventory}</p>
          </div>
          <div>
            <p>New On Hand Total</p>
            <p className="font-bold">{data.updatedStock.newOnHandTotal}</p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="border p-4 rounded mb-4">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold">Product Information</h2>
          <button className="text-blue-500 underline">Edit ✏️</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p>Product Name</p>
            <p className="font-bold">{data.productInfo.name}</p>
          </div>
          <div>
            <p>Product Category</p>
            <p className="font-bold">{data.productInfo.category}</p>
          </div>
          <div>
            <p>Product Sub-Category</p>
            <p className="font-bold">{data.productInfo.subCategory}</p>
          </div>
          <div>
            <p>Expiry Date</p>
            <p className="font-bold">{data.productInfo.expiryDate}</p>
          </div>
          <div>
            <p>Colors</p>
            <p className="font-bold">{data.productInfo.colors}</p>
          </div>
          <div>
            <p>Sizes</p>
            <p className="font-bold">{data.productInfo.sizes}</p>
          </div>
          <div>
            <p>Price</p>
            <p className="font-bold">{data.productInfo.price}</p>
          </div>
        </div>
      </div>

      {/* Stock Information */}
      <div className="border p-4 rounded mb-4">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold">Stock Information</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-200 p-2 rounded">Edit Current Stock</button>
            <button className="bg-gray-200 p-2 rounded">Add New Stock</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-2">
          <div>
            <p>Opening Stock</p>
            <p className="font-bold">{data.stockInfo.openingStock}</p>
          </div>
          <div>
            <p>Stock Sold</p>
            <p className="font-bold">{data.stockInfo.stockSold}</p>
          </div>
          <div>
            <p>Stock Damaged</p>
            <p className="font-bold">{data.stockInfo.stockDamaged}</p>
          </div>
          <div>
            <p>On Hand Stock</p>
            <p className="font-bold">{data.stockInfo.onHandStock}</p>
          </div>
        </div>
      </div>

      {/* Updated Stock Information Table */}
      <div className="border p-4 rounded mb-4">
        <h2 className="text-md font-semibold mb-2">Updated Stock Information</h2>
        <Table
          dataSource={data.updatedStockHistory.map((item, index) => ({
            key: index, // Ant Design requires a unique key for each row
            ...item,
          }))}
          columns={columns}
          bordered
          pagination={{ pageSize: 5 }} // Optional pagination
        />
      </div>
    </div>
  );
}
