import React from "react";
import { Table, Checkbox, Input, Button, Pagination, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  category: string;
  productName: string;
  amount: string;
  discountAmount: string;
  offer: string;
}

const products: Product[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  category: "Denim",
  productName: "Baggy Denim",
  amount: "₹ 2,160.00",
  discountAmount: "Pink",
  offer: "24 %"
}));

const Configure: React.FC = () => {
  const columns = [
    {
      title: <Checkbox />,
      dataIndex: "id",
      key: "checkbox",
      render: () => <Checkbox />
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Discount Amount",
      dataIndex: "discountAmount",
      key: "discountAmount"
    },
    {
      title: "Offer %",
      dataIndex: "offer",
      key: "offer"
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="text"
          icon={<EllipsisOutlined />}
          size="small"
        ></Button>
      )
    }
  ];

  return (
    <div style={{ padding: "16px" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Configure Categories and Offer</h1>
        {/* Search Bar with Button */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          <Input.Search
            placeholder="Search"
            allowClear
            style={{ width: "300px" }}
          />
          <Button type="primary">Search</Button>
        </div>
      </div>
      
      {/* Table Section */}
      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
      />

      {/* Pagination Section */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Displaying 10 of 30 items</span>
        <Pagination defaultCurrent={1} total={30} pageSize={10} />
      </div>

      {/* Action Buttons Section */}
      <Space style={{ marginTop: "16px", justifyContent: "flex-end", display: "flex" }}>
        <Button type="primary">Apply / Edit Discount</Button>
        <Button type="primary">Create New Category</Button>
      </Space>
    </div>
  );
};

export default Configure;
