import { useState, useEffect } from "react";
import { Table, Input, Select, Button } from "antd";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Number of orders per page

    const { Option } = Select;

    // Fetch data from the backend
    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://your-backend-api/orders");
                const data = await response.json();
                setOrders(data); // Assuming the response is an array of orders
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, []);

    // Filter and search orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.productName
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesFilter = filter ? order.status === filter : true;
        return matchesSearch && matchesFilter;
    });

    // Ant Design Table Columns
    const columns = [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `$${amount}`, // Format amount as currency
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleViewOrder(record)}>
                    View
                </Button>
            ),
        },
    ];

    // Pagination logic for Ant Design Table
    const paginationConfig = {
        current: currentPage,
        pageSize: ordersPerPage,
        total: filteredOrders.length,
        onChange: (page) => setCurrentPage(page),
    };

    // Handle view order action
    const handleViewOrder = (order) => {
        console.log("Viewing order:", order);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Order</h1>

            {/* Search and Filter */}
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: 200 }}
                />
                <Select
                    placeholder="Filter by status"
                    value={filter}
                    onChange={(value) => setFilter(value)}
                    style={{ width: 200 }}
                >
                    <Option value="">Filter</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </div>

            {/* Orders Table */}
            <Table
                columns={columns}
                dataSource={filteredOrders}
                pagination={paginationConfig}
                rowKey="id" // Unique key for each row
            />
        </div>
    );
}
