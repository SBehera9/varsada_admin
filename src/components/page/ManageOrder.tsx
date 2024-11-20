// pages/ManageOrder.tsx
import { useState, useEffect } from "react";
import Heading from "../UI/ManageOrder/Heading";
import SearchFilter from "../UI/ManageOrder/SearchFilter";
import OrderTable from "../UI/ManageOrder/OrderTable";

export default function ManageOrder() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://your-backend-api/orders");
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.productName
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesFilter = filter ? order.status === filter : true;
        return matchesSearch && matchesFilter;
    });

    const handleViewOrder = (order: any) => {
        console.log("Viewing order:", order);
    };

    return (
        <div className="p-4">
            <Heading title="Manage Order" />
            <SearchFilter
                search={search}
                filter={filter}
                onSearchChange={setSearch}
                onFilterChange={setFilter}
            />
            <OrderTable
                orders={filteredOrders}
                currentPage={currentPage}
                ordersPerPage={ordersPerPage}
                totalOrders={filteredOrders.length}
                onPageChange={setCurrentPage}
                onViewOrder={handleViewOrder}
            />
        </div>
    );
}
