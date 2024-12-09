import React, { useEffect, useState } from "react";
import { Table, Button, Spin, message } from "antd";

// Define the types for the fetched data
interface StockInfo {
  openingStock: number;
  newInventory: number;
  onHandTotal: number;
  totalOpeningStock: number;
  stockSold: number;
  stockDamaged: number;
  onHandStock: number;
}

interface ProductInfo {
  itemNumber: string;
  productName: string;
  category: string;
  subCategory: string;
  expiryDate: string;
  colors: string;
  sizes: string;
  price: string;
}

interface StockHistory {
  date: string;
  openingStock: number;
  newInventory: number;
  onHandTotal: number;
}

export default function ManagePromo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [stockInfo, setStockInfo] = useState<StockInfo | {}>({});
  const [productInfo, setProductInfo] = useState<ProductInfo | {}>({});
  const [stockHistory, setStockHistory] = useState<StockHistory[]>([]);

  useEffect(() => {
    // Fetch data from the backend
    setLoading(true);
    fetch("/api/get-stock-data") 
      .then((response) => response.json())
      .then((data) => {
        
        setStockInfo(data.stockInfo);
        setProductInfo(data.productInfo);
        setStockHistory(data.stockHistory);
      })
      .catch((error) => {
        message.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Opening On Hand Stock",
      dataIndex: "openingStock",
      key: "openingStock",
    },
    {
      title: "New Inventory Count",
      dataIndex: "newInventory",
      key: "newInventory",
    },
    {
      title: "New On Hand Total",
      dataIndex: "onHandTotal",
      key: "onHandTotal",
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button type="link">Edit</Button>,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Updated Stock Information */}
      <div className="mb-6 shadow-md p-4 rounded">
        <h1 className="text-xl font-bold mb-4">
          Item no: {productInfo.itemNumber} ({productInfo.productName})
        </h1>
        <h2 className="text-lg font-semibold mb-2">Updated Stock Information</h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="font-medium">Opening On Hand Stock</p>
            <p className="text-xl">{stockInfo.openingStock}</p>
          </div>
          <div>
            <p className="font-medium">New Inventory Count</p>
            <p className="text-xl">{stockInfo.newInventory}</p>
          </div>
          <div>
            <p className="font-medium">New On Hand Total</p>
            <p className="text-xl">{stockInfo.onHandTotal}</p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="mb-6 shadow-md p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Product Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-medium">Product Name</p>
            <p>{productInfo.productName}</p>
          </div>
          <div>
            <p className="font-medium">Product Category</p>
            <p>{productInfo.category}</p>
          </div>
          <div>
            <p className="font-medium">Product Sub-Category</p>
            <p>{productInfo.subCategory}</p>
          </div>
          <div>
            <p className="font-medium">Expiry Date</p>
            <p>{productInfo.expiryDate}</p>
          </div>
          <div>
            <p className="font-medium">Colors</p>
            <p>{productInfo.colors}</p>
          </div>
          <div>
            <p className="font-medium">Sizes</p>
            <p>{productInfo.sizes}</p>
          </div>
          <div>
            <p className="font-medium">Price</p>
            <p>{productInfo.price}</p>
          </div>
        </div>
        <button className="mt-4 py-2 px-4 bg-[#C473FF] text-white hover:bg-[#C473FF] rounded">
          Edit
        </button>
      </div>

      {/* Stock Information */}
      <div className="mb-6 shadow-md p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Stock Information</h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="font-medium">Opening Stock</p>
            <p className="text-xl">{stockInfo.totalOpeningStock}</p>
          </div>
          <div>
            <p className="font-medium">Stock Sold</p>
            <p className="text-xl">{stockInfo.stockSold}</p>
          </div>
          <div>
            <p className="font-medium">Stock Damaged</p>
            <p className="text-xl">{stockInfo.stockDamaged}</p>
          </div>
          <div>
            <p className="font-medium">On Hand Stock</p>
            <p className="text-xl">{stockInfo.onHandStock}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button className="py-2 px-4 bg-[#C473FF] text-white hover:bg-[#C473FF] rounded">
            Edit Current Stock
          </button>
          <button className="py-2 px-4 bg-[#C473FF] text-white hover:bg-[#C473FF] rounded">
            Add New Stock
          </button>
        </div>
      </div>

      {/* Updated Stock History Section */}
      <div className="mt-6 shadow-md p-4 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Updated Stock History</h2>
        <Table
          columns={columns}
          dataSource={stockHistory}
          pagination={{
            pageSize: 5,
          }}
          bordered
        />
      </div>
    </div>
  );
}
