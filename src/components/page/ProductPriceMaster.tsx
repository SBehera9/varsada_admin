import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Dropdown, Menu, Select } from "antd";
import { SearchOutlined, UploadOutlined, PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import axios from "axios"; 
import type { MenuProps } from "antd";

const { Option } = Select;

interface Product {
  itemNo: number;
  productName: string;
  color: string;
  uom: string;
  price: string;
  selling: number;
}

const ProductPriceMaster: React.FC = () => {
  const [dataSource, setDataSource] = useState<Product[]>([]); 
  const [filter, setFilter] = useState<string>(""); 
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get<Product[]>("https://your-backend-api.com/products"); 
      console.log(response.data); 
      setDataSource(response.data); 
      setFilteredData(response.data); 
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value);

    if (value === "price") {
      const filtered = dataSource.filter((item) => item.price.includes("₹"));
      setFilteredData(filtered);
    } else if (value === "color") {
      const filtered = dataSource.filter((item) => item.color);
      setFilteredData(filtered);
    } else {
      setFilteredData(dataSource); 
    }
  };

  const menuItems: MenuProps["items"] = [
    { label: "Edit", key: "1" },
    { label: "Activate", key: "2" },
    { label: "Hide", key: "3" },
  ];

  const columns = [
    {
      title: "Item No",
      dataIndex: "itemNo",
      key: "itemNo",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Selling (%)",
      dataIndex: "selling",
      key: "selling",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        Product Price Master
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Space>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: "200px" }}
          />
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={handleFilterChange}
          >
            <Option value="">Select Filter</Option>
            <Option value="price">Price</Option>
            <Option value="color">Color</Option>
          </Select>
        </Space>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button className="bg-[#C473FF] text-white hover:bg-[#C473FF]" icon={<UploadOutlined />}>Upload Bulk Product File</Button>
          <Button className="bg-[#C473FF] text-white hover:bg-[#C473FF]" icon={<PlusOutlined />}>
            Create New Product
          </Button>
        </div>
      </div>
      <Table<Product>
        dataSource={filteredData} 
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="itemNo" 
      />
    </div>
  );
};

export default ProductPriceMaster;
