import React, { useState, useEffect } from "react";
import { Table, Checkbox, Input, Button, Pagination, Space } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios"; 

interface Product {
  id: number;
  category: string;
  productName: string;
  amount: string;
  discountAmount: string;
  offer: string;
}

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
}

const Configure: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  
  const [loading, setLoading] = useState<boolean>(false);  
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 30,
  });

  const fetchProducts = async (page: number = 1, pageSize: number = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products`, {
        params: {
          page,
          pageSize,
        },
      });

      setProducts(response.data.data); 
      setPagination({
        ...pagination,
        total: response.data.total,  
      });
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div style={{ marginBottom: "16px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Configure Categories and Offer
        </h1>

        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
  <Input.Search
    placeholder="Search"
    allowClear
    style={{ width: "300px" }}
  />
  <Button className="bg-[#C473FF] text-white hover:bg-[#C473FF]">
    Search
  </Button>

  <Space style={{ marginBottom: "16px" }}>
    <Button className="bg-[#C473FF] text-white hover:bg-[#C473FF]">
      Apply / Edit Discount
    </Button>
    <Button className="bg-[#C473FF] text-white hover:bg-[#7a3ea5] hover:text-white">
      Create New Category
    </Button>
  </Space>
</div>

      </div>

      <Table
        dataSource={products}
        columns={columns}
        pagination={false}  
        rowKey="id"
        bordered
        loading={loading}
      />

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
