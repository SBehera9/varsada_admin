import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Dropdown, Menu, Select } from "antd";
import { SearchOutlined, UploadOutlined, PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import axios from "axios"; // Import axios for making API requests

const { Option } = Select;

const ProductPriceMaster = () => {
  // State to store the fetched product data
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState(""); // Store the selected filter value
  const [filteredData, setFilteredData] = useState([]);

  // Function to fetch data from the backend API
  const fetchProductData = async () => {
    try {
      const response = await axios.get("https://your-backend-api.com/products"); // Replace with your backend URL
      console.log(response.data); // Log data to ensure it's fetched correctly
      setDataSource(response.data); // Update state with fetched data
      setFilteredData(response.data); // Initially set filtered data to all products
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchProductData();
  }, []);

  // Filter function
  const handleFilterChange = (value) => {
    setFilter(value);

    // Filtering logic based on selected filter value
    if (value === "price") {
      const filtered = dataSource.filter(item => item.price.includes("₹"));
      setFilteredData(filtered);
    } else if (value === "color") {
      const filtered = dataSource.filter(item => item.color);
      setFilteredData(filtered);
    } else {
      setFilteredData(dataSource); // Reset to full data if no filter is selected
    }
  };

  // Table columns
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
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Activate</Menu.Item>
              <Menu.Item key="3">Hide</Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
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
          <Button icon={<UploadOutlined />}>Upload Bulk Product File</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Create New Product
          </Button>
        </div>
      </div>
      <Table
        dataSource={filteredData} // Use filtered data here
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default ProductPriceMaster;
