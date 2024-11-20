// components/OrderTable.tsx
import { Table, Button } from "antd";

interface Order {
    productName: string;
    id: string;
    date: string;
    customerName: string;
    status: string;
    amount: number;
}

interface OrderTableProps {
    orders: Order[];
    currentPage: number;
    ordersPerPage: number;
    totalOrders: number;
    onPageChange: (page: number) => void;
    onViewOrder: (order: Order) => void;
}

export default function OrderTable({
    orders,
    currentPage,
    ordersPerPage,
    totalOrders,
    onPageChange,
    onViewOrder,
}: OrderTableProps) {
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
            render: (amount: number) => `$${amount}`,
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Order) => (
                <Button type="primary" onClick={() => onViewOrder(record)}>
                    View
                </Button>
            ),
        },
    ];

    const paginationConfig = {
        current: currentPage,
        pageSize: ordersPerPage,
        total: totalOrders,
        onChange: onPageChange,
    };

    return (
        <Table
            columns={columns}
            dataSource={orders}
            pagination={paginationConfig}
            rowKey="id"
        />
    );
}
