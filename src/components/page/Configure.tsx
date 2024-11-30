import React, { useState, useEffect } from "react";
import { Table, Checkbox, Input, Button, Pagination, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios"; // Import axios for API calls

interface Product {
  id: number;
  category: string;
  productName: string;
  amount: string;
  discountAmount: string;
  offer: string;
}

const Configure: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  // State to store products
  const [loading, setLoading] = useState<boolean>(false);  // Loading state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 30,
  });

  // Fetch products data from the backend
  const fetchProducts = async (page: number = 1, pageSize: number = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products`, {
        params: {
          page,
          pageSize,
        },
      });

      // Assuming the response has the following structure
      // { data: [], total: 30 }
      setProducts(response.data.data); 
      setPagination({
        ...pagination,
        total: response.data.total,  // Total items for pagination
      });
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load the products when the component mounts
  useEffect(() => {
    fetchProducts(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  const columns = [
    {
      title: <Checkbox />,
      dataIndex: "id",
      key: "checkbox",
      render: () => <Checkbox />,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Discount Amount",
      dataIndex: "discountAmount",
      key: "discountAmount",
    },
    {
      title: "Offer %",
      dataIndex: "offer",
      key: "offer",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="text" icon={<EllipsisOutlined />} size="small" />
      ),
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Configure Categories and Offer
        </h1>

        {/* Search Bar with Button */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <Input.Search
            placeholder="Search"
            allowClear
            style={{ width: "300px" }}
          />
          <Button type="primary">Search</Button>

          {/* Action Buttons Section moved above the search */}
          <Space style={{ marginBottom: "16px" }}>
            <Button type="primary">Apply / Edit Discount</Button>
            <Button type="primary">Create New Category</Button>
          </Space>
        </div>
      </div>

      {/* Table Section */}
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}  // Disable table pagination for custom pagination below
        rowKey="id"
        bordered
        loading={loading}
      />

      {/* Pagination Section */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Displaying {pagination.pageSize} of {pagination.total} items</span>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(page, pageSize) => {
            setPagination({ current: page, pageSize });
            fetchProducts(page, pageSize);
          }}
        />
      </div>
    </div>
  );
};

export default Configure;
